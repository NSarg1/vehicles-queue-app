import { useEffect, useMemo } from 'react';
import { useQuery, useQueryClient, UseQueryResult } from '@tanstack/react-query';
import { produce } from 'immer';
import { ChargerProps, CreatedVehicleProps, VehicleListProps } from 'src/app/App';
import { vehiclesMap } from 'src/app/app.data';
import socket from 'src/configs/socket.config';
import { vehiclesApi } from 'src/service/vehicles.api';

import styles from './charger.module.scss';

import QueueItem from './components/QueueItem/QueueItem';
import VehicleForm from './components/VehicleForm/VehicleForm';

const getCharger = async (chargerName: string) => {
  return await vehiclesApi.getVehicles(chargerName);
};
const Charger: React.FC<{ charger: ChargerProps }> = ({ charger }) => {
  const QUERY = useMemo(() => ['GET_CHARGER_QUEUE', charger.name], [charger.name]);
  const queryClient = useQueryClient();

  const { data }: UseQueryResult<VehicleListProps> = useQuery({
    queryKey: QUERY,
    queryFn: ({ queryKey }) => getCharger(queryKey[1]),
    select: (res) => res.data,
  });

  useEffect(() => {
    const handleVehicleCreated = (newVehicle: CreatedVehicleProps) => {
      queryClient.setQueryData(QUERY, (response: { data: VehicleListProps }) => {
        return produce(response, (draft) => {
          if (!draft.data) draft.data = []; // If no data exists, initialize it with the new vehicle
          draft.data.push(newVehicle); // Append the new vehicle to the list
        });
      });
    };

    const handleVehicleDeleted = (removedVehicle: CreatedVehicleProps) => {
      queryClient.setQueryData(QUERY, (response: { data: VehicleListProps }) => {
        return produce(response, (draft) => {
          console.log(removedVehicle);
          if (!draft?.data) return draft; // If no data, return as is
          draft.data = draft.data.filter((vehicle) => vehicle.id !== removedVehicle.id);
        });
      });
    };

    socket.on(`${charger.name}.vehicle.created`, handleVehicleCreated);
    socket.on(`${charger.name}.vehicle.deleted`, handleVehicleDeleted);

    return () => {
      socket.off(`${charger.name}.vehicle.created`, handleVehicleCreated);
      socket.off(`${charger.name}.vehicle.deleted`, handleVehicleDeleted);
      socket.disconnect();
    };
  }, [QUERY, charger.name, queryClient]);

  return (
    <div className={styles.charger} key={charger.name}>
      <h2>{charger.name}</h2>
      <div className={styles.block}>
        <div className={styles['waiting-queue']}>
          {data?.map(({ plate, registerTime, id }) => {
            const vehicle = vehiclesMap[plate];

            return <QueueItem key={id} id={id} vehicle={vehicle} registerTime={registerTime} />;
          })}
        </div>

        <VehicleForm chargerName={charger.name} />
      </div>
    </div>
  );
};

export default Charger;

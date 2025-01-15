import { DeleteOutlined } from '@ant-design/icons';
import { Button, Space, Spin } from 'antd';
import dayjs from 'dayjs';
import { VehicleProps } from 'src/app/app.data';
import useAsyncFn from 'src/hooks/useAsyncFn.hook';
import { vehiclesApi } from 'src/service/vehicles.api';

import styles from './queue-item.module.scss';

type QueueItemProps = {
  vehicle: VehicleProps;
  registerTime: string;
  id: number;
};

const QueueItem: React.FC<QueueItemProps> = ({ vehicle, id, registerTime }) => {
  const [removeVehicle, isLoading] = useAsyncFn(async () => {
    try {
      await vehiclesApi.deleteVehicle(id);
    } catch (error) {
      console.log(error);
    }
  });
  return (
    <div className={styles.vehicle}>
      <span>
        {vehicle?.name} / {vehicle?.plate}
      </span>
      <Space>
        <span>{dayjs(registerTime).format('HH:mm')}</span>
        <Button type="text" danger onClick={removeVehicle}>
          {!isLoading ? <DeleteOutlined /> : <Spin size="small" />}
        </Button>
      </Space>
    </div>
  );
};

export default QueueItem;

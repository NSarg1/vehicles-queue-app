import { DeleteFilled, DeleteOutlined } from '@ant-design/icons';
import { Button, List, Space, Spin } from 'antd';
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
    <li className={styles.item}>
      <span>
        {vehicle?.name} / {vehicle?.plate}
      </span>
      <Space>
        <span>{dayjs(registerTime).format('HH:mm')}</span>
        <Button type="text" danger onClick={removeVehicle} size="small" className={styles.btn}>
          {!isLoading ? <DeleteFilled className={styles.icon} /> : <Spin size="small" />}
        </Button>
      </Space>
    </li>
  );
};

export default QueueItem;

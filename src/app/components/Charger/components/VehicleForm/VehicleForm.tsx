import { SendOutlined } from '@ant-design/icons';
import { Button, Form, Select, Spin } from 'antd';
import { vehicles } from 'src/app/app.data';
import useAsyncFn from 'src/hooks/useAsyncFn.hook';
import { vehiclesApi } from 'src/service/vehicles.api';

import styles from './vehicle-form.module.scss';

type VehicleFormProps = {
  chargerName: string;
};

const VehicleForm: React.FC<VehicleFormProps> = ({ chargerName }) => {
  const [formRef] = Form.useForm();
  const vehicle = Form.useWatch(['vehicle'], formRef);

  const [handleSubmit, isLoading] = useAsyncFn(async ({ vehicle }: { vehicle: { label: string; value: string } }) => {
    try {
      await vehiclesApi.createVehicle({ plate: vehicle.value, charger: chargerName });
      formRef.resetFields();
    } catch (error) {
      console.log(error);
    }
  });

  return (
    <Form form={formRef} onFinish={handleSubmit} className={styles.form}>
      <Form.Item name="vehicle" required className={styles.select}>
        <Select
          placeholder="Select plate number"
          options={vehicles}
          labelInValue
          fieldNames={{ label: 'plate', value: 'plate' }}
          showSearch
        />
      </Form.Item>
      <Button htmlType="submit" disabled={!vehicle}>
        {!isLoading ? <SendOutlined /> : <Spin size="small" />}
      </Button>
    </Form>
  );
};

export default VehicleForm;

import { useEffect, useState } from 'react';
import Form from 'antd/lib/form';
import { FormInstance } from 'antd/lib/form/hooks/useForm';

export interface IFormValidate {
  submittable: boolean;
}

const useFormValidate = (form: FormInstance): IFormValidate => {
  const values = Form.useWatch([], form);
  const [submittable, setSubmittable] = useState<boolean>(false);

  useEffect(() => {
    form.validateFields({ validateOnly: true }).then(
      () => {
        setSubmittable(true);
      },
      () => {
        setSubmittable(false);
      },
    );
  }, [values]);
  return {
    submittable,
  };
};

export default useFormValidate;

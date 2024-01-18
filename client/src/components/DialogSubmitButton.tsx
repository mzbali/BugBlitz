import { DialogClose } from '@radix-ui/react-dialog';

import Button from '@/components/ui/buttons/Button';

interface Props {
  isValid: boolean;
  loading: boolean;
}

const DialogSubmitButton: React.FC<Props> = ({ isValid, loading }) => {
  return isValid ? (
    <DialogClose asChild>
      <Button isLoading={loading} type='submit'>
        Save
      </Button>
    </DialogClose>
  ) : (
    <Button isLoading={loading} type='submit'>
      Save
    </Button>
  );
};

export default DialogSubmitButton;

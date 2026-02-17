import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from 'dgz-ui/button';
import { Form, RadioGroup } from 'dgz-ui/form';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import {
  MyCheckbox,
  MyDatePicker,
  MyDateRangePicker,
  MyInput,
  MyMaskInput,
  MyRadio,
  MySelect,
  MyTextarea,
  MyTimePicker,
} from './components';

function App() {
  // const [params, setParams] = useState<Record<string, unknown>>({
  //   page: 1,
  //   limit: 10,
  //   test: ['test 1'],
  // });
  // const [data] = useState<
  //   PaginationInterface<{ name: string; id: string; date: string }>
  // >({
  //   docs: [
  //     {
  //       name: 'name 1',
  //       id: 'id 1',
  //       date: 'date 1',
  //     },
  //     {
  //       name: 'name 2',
  //       id: 'id 2',
  //       date: 'date 2',
  //     },
  //     {
  //       name: 'name 3',
  //       id: 'id 3',
  //       date: 'date 3',
  //     },
  //   ],
  //   page: 1,
  //   total: 1,
  //   limit: 10,
  //   totalPages: 1,
  // });
  //
  // const columns = useMemo<
  //   ColumnType<{ name: string; id: string; date: string }>[]
  // >(
  //   () => [
  //     {
  //       name: 'id',
  //       dataIndex: 'id',
  //       key: 'id',
  //       sortable: true,
  //     },
  //     {
  //       name: 'name',
  //       dataIndex: 'name',
  //       key: 'name',
  //       sortable: true,
  //     },
  //     {
  //       name: 'date',
  //       dataIndex: 'date',
  //       key: 'date',
  //       sortable: true,
  //     },
  //   ],
  //   []
  // );
  //
  // const filters = useMemo<FilterInterface[]>(
  //   () => [
  //     {
  //       name: 'test',
  //       label: 'test',
  //       isMulti: true,
  //       options: [
  //         { label: 'test 1', value: 'test 1' },
  //         { label: 'test 2', value: 'test 2' },
  //       ],
  //     },
  //   ],
  //   []
  // );
  //
  // console.log(params);
  const form = useForm<{
    name: string;
    range: { from: Date; to: Date };
    checkbox: boolean;
    radio: string;
    time: string;
    date: Date;
  }>({
    resolver: zodResolver(
      z.object({
        name: z.string().nonempty('this field is required'),
        range: z.object({
          from: z.date(),
          to: z.date(),
        }),
        checkbox: z.boolean(),
        radio: z.string(),
        time: z.string(),
        date: z.date(),
      })
    ),
  });

  console.log(form.watch());

  return (
    <Form {...form}>
      <form
        className={'mx-auto max-w-2xl space-y-4'}
        onSubmit={form.handleSubmit(console.log)}
      >
        <MyDatePicker
          // disabled
          control={form.control}
          name={'date'}
          placeholder={'Select date'}
        />
        <MyDateRangePicker
          // disabled
          control={form.control}
          name={'range'}
          label={'Label'}
          placeholder={'Select date range'}
        />
        <MyMaskInput
          label={'Label'}
          required
          mask={'000000'}
          control={form.control}
          name={'name'}
          placeholder={'Placeholder'}
        />
        <MyMaskInput
          floatingError
          label={'Label'}
          required
          mask={'000000'}
          control={form.control}
          name={'name'}
          placeholder={'Placeholder'}
        />
        <div className={'flex items-end gap-3'}>
          <MyInput
            floatingError
            label={'Label'}
            required
            control={form.control}
            name={'name'}
            placeholder={'Placeholder'}
          />
          <Button>Save</Button>
        </div>

        <MySelect
          label={'Label'}
          control={form.control}
          name={'name'}
          placeholder={'Placeholder'}
          options={[]}
        />

        <MyTextarea
          floatingError
          label={'Label'}
          required
          control={form.control}
          name={'name'}
          placeholder={'Placeholder'}
        />

        <MyTimePicker
          floatingError
          label={'Label'}
          required
          control={form.control}
          name={'time'}
        />

        <MyCheckbox label={'Label'} control={form.control} name={'checkbox'} />
        <RadioGroup>
          <MyRadio
            value={'ll'}
            label={'Label'}
            control={form.control}
            name={'radio'}
          />{' '}
        </RadioGroup>
      </form>
    </Form>
  );
}

export default App;

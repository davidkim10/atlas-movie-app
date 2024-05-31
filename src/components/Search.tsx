'use client';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import type { FC } from 'react';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { Form, FormControl, FormField, FormItem } from './ui/form';
import { Input } from './ui/input';

interface SearchProps {}

const formSchema = z.object({
  searchInput: z.string().min(2).max(50),
});

export const Search: FC<SearchProps> = ({}) => {
  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      searchInput: '',
    },
  });

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    router.push(`/search/${values.searchInput}`);
    form.reset();
  };

  return (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="spaced-y-8">
          <FormField
            control={form.control}
            name="searchInput"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input {...field} placeholder="Search..." type="search" className="w-full" />
                </FormControl>
              </FormItem>
            )}
          />
        </form>
      </Form>
    </>
  );
};

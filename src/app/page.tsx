import { redirect } from 'next/navigation';

export default function Home() {
  // Redirect to the todos page
  redirect('/todos');
}

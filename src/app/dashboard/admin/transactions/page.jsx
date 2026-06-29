import { protectedFetch } from "@/lib/core/server";
import TransactionsTable from "./TransactionsTable";
export const metadata = {
  title: "All Transactions",
};
const page = async () => {
  const transactions = await protectedFetch("/api/admin/transactions");
  return <TransactionsTable initialTransactions={transactions} />;
};
export default page;

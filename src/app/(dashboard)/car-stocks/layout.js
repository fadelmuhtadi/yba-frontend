import AuthGuard from "../../../components/AuthGuard";

export default function CarStocksLayout({ children }) {
  return <AuthGuard>{children}</AuthGuard>;
}
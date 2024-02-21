
import Header from '@/components/header/header'
export default function RootLayoutHeader({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
        <Header />
        {children}
    </>

  )
}

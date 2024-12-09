import CustomerLogin from "@/components/customerLogin/customerLogin";

const LoginqrPage = ({params}: any) => {
 const qrCodeParam = params.id

  return (<CustomerLogin qrCodeParam={qrCodeParam}/>)
};

export default LoginqrPage;

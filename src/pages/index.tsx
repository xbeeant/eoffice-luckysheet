import React from 'react';
import type { LuckysheetConfig } from '@/components/Luckysheet';
import LuckysheetWrapper from '@/components/Luckysheet';

interface LocationProps extends Location {
  query: { rid: string; sid: string };
}

const Index: React.FC = () => {
  // const {
  //   query: { rid },
  // } = location;
  //
  // const [loading, setLoading] = useState<boolean>(true);
  // const [data, setData] = useState<string>('');
  // const [permission, setPermission] = useState<PermissionProps>({
  //   copy: true,
  //   print: true,
  //   download: true,
  //   edit: true,
  // });

  // const loadData = async () => {
  //   setLoading(true);
  //   if (rid) {
  //     const response = await request('/api/resource/detail', {
  //       params: {
  //         rid,
  //       },
  //     });
  //     if (response.success) {
  //       setPermission({
  //         copy: true,
  //         print: true,
  //         download: true,
  //         edit: true,
  //       });
  //       // load content from url
  //       const downloaded = await request(response.data.url);
  //       setData(downloaded);
  //     }
  //   }
  // };
  //
  // useEffect(() => {
  //   loadData().then(() => setLoading(false));
  // }, [rid]);

  // 配置项
  const options: LuckysheetConfig = {
    // filename
    title: 'This is a Demo Sheet',
    gridKey: new Date().getTime() + '',
    userInfo:
      '<i style="font-size:16px;color:#ff6a00;" class="fa fa-taxi" aria-hidden="true"></i> Lucky',
    allowUpdate: false,
  };
  return <LuckysheetWrapper options={options} />;
  // return (
  //   <div>
  //     {loading && <Skeleton />}
  //     {!loading &&
  //       (rid ? (
  //         <div
  //           style={{
  //             height: '100%',
  //           }}
  //         >
  //           <LuckysheetWrapper options={options} />
  //         </div>
  //       ) : (
  //         <div>参数不全</div>
  //       ))}
  //   </div>
  // );
};

export default Index;

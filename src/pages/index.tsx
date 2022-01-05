import { useEffect, useState } from 'react';
import type { LuckysheetConfig, PermissionProps } from '@/components/Luckysheet';
import LuckysheetWrapper from '@/components/Luckysheet';
import { request } from 'umi';
import { message, Skeleton } from 'antd';

interface LocationProps extends Location {
  query: { rid: string; sid: string };
}

const Index: ({ location }: { location: LocationProps }) => JSX.Element = ({ location }) => {
  const {
    query: { rid },
  } = location;

  const [loading, setLoading] = useState<boolean>(true);
  const [permission, setPermission] = useState<PermissionProps>({
    copy: true,
    print: true,
    download: true,
    edit: true,
  });
  const [dataUrl, setDataUrl] = useState<string>('');

  const loadData = async () => {
    setLoading(true);
    if (rid) {
      const response = await request('/api/resource/detail', {
        params: {
          rid,
        },
      });
      if (response.success) {
        setPermission({
          copy: true,
          print: true,
          download: true,
          edit: true,
        });
        // load content from url
        // const downloaded = await request(response.data.url);
        setDataUrl(response.data.url);
        // setData(downloaded || []);
      }
    }
  };

  useEffect(() => {
    loadData().then(() => setLoading(false));
  }, [rid]);

  // 配置项
  const options: LuckysheetConfig = {
    // filename
    title: 'This is a Demo Sheet',
    gridKey: new Date().getTime() + '',
    userInfo:
      '<i style="font-size:16px;color:#ff6a00;" class="fa fa-taxi" aria-hidden="true"></i> Lucky',
    allowUpdate: true,
    loadUrl: dataUrl,
    updateUrl: 'ws://localhost:8080/eoffice/api/socket/lucksheet/' + rid,
    // data,
  };
  // return <LuckysheetWrapper options={options} />;
  return (
    <div>
      {loading && <Skeleton />}
      {!loading &&
        (rid ? (
          <div
            style={{
              height: '100%',
            }}
          >
            <LuckysheetWrapper
              options={options}
              onSave={(value) => {
                request('/api/resource', {
                  method: 'POST',
                  requestType: 'form',
                  data: {
                    rid,
                    value,
                  },
                }).then((response) => {
                  if (response.success) {
                    message.success(response.msg);
                  } else {
                    message.error(response.msg);
                  }
                });
              }}
            />
          </div>
        ) : (
          <div>参数不全</div>
        ))}
    </div>
  );
};

export default Index;

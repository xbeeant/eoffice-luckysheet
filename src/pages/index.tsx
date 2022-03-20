import { useEffect, useState } from 'react';
import type { LuckysheetConfig, PermissionProps } from '@/components/Luckysheet';
import LuckysheetWrapper from '@/components/Luckysheet';
import { request } from 'umi';
import { message, Skeleton } from 'antd';
import { API, ApiResponse, LocationProps, ResourceInfo } from './typings';
import { PageContainer } from '@ant-design/pro-layout';

const Index: ({ location }: { location: LocationProps }) => JSX.Element = ({ location }) => {
  const {
    query: { rid, k, vid, shareId, share },
  } = location;

  const [loading, setLoading] = useState<boolean>(true);
  const [title, setTitle] = useState<string>('');

  const [dataUrl, setDataUrl] = useState<string>('');
  const [currentUser, setCurrentUser] = useState<API.CurrentUser>();

  // 配置项
  const domain = window.location.host;
  let options: LuckysheetConfig = {
    // filename
    title,
    gridKey: rid,
    userInfo: `<i style="font-size:16px;color:#ff6a00;" aria-hidden="true"></i> ${
      currentUser?.name || ''
    }`,
    allowUpdate: true,
    loadUrl: dataUrl,
    updateUrl: 'ws://' + domain + '/eoffice/api/socket/sheet/' + k + '/' + new Date().getTime(),
    // data,
  };

  const loadData = async () => {
    setLoading(true);
    if (rid) {
      const response: ApiResponse<ResourceInfo> = await request('/eoffice/api/resource/detail', {
        params: {
          rid,
          vid,
          share,
          shareId,
        },
      });
      const user = await request<ApiResponse<API.CurrentUser>>('/eoffice/api/currentUser', {
        method: 'GET',
        skipErrorHandler: true,
      });
      setCurrentUser(user.data);
      if (response.success) {
        options.allowUpdate = response.data.perm.edit;
        options.allowCopy = response.data.perm.edit;

        setTitle(response.data.name);
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

  console.log(currentUser?.name);

  return (
    <PageContainer title={false} waterMarkProps={{ content: currentUser?.name || '' }}>
      {loading && <Skeleton />}
      {!loading && (
        <div
          style={{
            height: '100vh',
          }}
        >
          <LuckysheetWrapper
            options={options}
            onSave={(value) => {
              request('/eoffice/api/resource', {
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
      )}
    </PageContainer>
  );
};

export default Index;

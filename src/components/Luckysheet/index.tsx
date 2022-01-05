import { useEffect } from 'react';

export interface PermissionProps {
  copy: boolean;
  print: boolean;
  download: boolean;
  edit: boolean;
}

export interface LuckysheetConfig {
  gridKey: string;
  title: string;
  container?: string;
  data?: [];
  userImage?: string;
  userInfo: string;
  loadUrl?: string;
  updateUrl?: string;
  // ------------------
  // 权限配置
  // ------------------
  // 允许更新
  allowUpdate: boolean;
  showtoolbarConfig?: {
    // 截图
    screenshot?: boolean;
  };
}

const LuckysheetWrapper = ({
  options,
  onSave,
}: {
  options: LuckysheetConfig;
  onSave: (value: string) => void;
}) => {
  const defaultOptions = {
    lang: 'zh',
    container: 'luckysheet',
    myFolderUrl: '/',
    functionButton: '<div id="saveBtn">保存</div>',
    showtoolbarConfig: {
      print: false,
    },
    hook: {
      workbookCreateAfter: () => {
        console.log('workbook created');
        try {
          // @ts-ignore
          $('#saveBtn').on('click', () => {
            // @ts-ignore
            const excel = luckysheet.getAllSheets();
            //去除临时数据,减小体积
            for (const i in excel) {
              excel[i].data = undefined;
            }
            onSave(JSON.stringify(excel));
          });
        } catch (e) {
          console.log(e);
        }
      },
    },
  };

  useEffect(() => {
    const sheetOptions = Object.assign({}, defaultOptions, options);
    // @ts-ignore
    luckysheet.create(sheetOptions);
  }, []);

  return (
    <div
      id="luckysheet"
      style={{
        margin: '0px',
        padding: '0px',
        position: 'absolute',
        width: '100%',
        height: '100%',
        left: '0px',
        top: '0px',
      }}
    />
  );
};

export default LuckysheetWrapper;

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

const defaultOptions = {
  lang: 'zh',
  container: 'luckysheet',
  showtoolbarConfig: {
    print: false,
  },
  hook: {
    workbookCreateAfter: () => {
      console.log('workbook created');
      try {
        // @ts-ignore
        const $infoDetail = $('#luckysheet_info_detail_update');
        $infoDetail.before("<div id='saveBtn'>保存</div>");
        // @ts-ignore
        $('#saveBtn').on('click', () => {
          // @ts-ignore
          const excel = luckysheet.getAllSheets();
          //去除临时数据,减小体积
          for (const i in excel) {
            excel[i].data = undefined;
          }
          // todo save to database
          alert(JSON.stringify(excel));
        });
      } catch (e) {
        console.log(e);
      }
    },
  },
};

const LuckysheetWrapper = ({ options }: { options: LuckysheetConfig }) => {
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

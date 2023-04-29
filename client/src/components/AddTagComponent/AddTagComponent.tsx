import React, { useEffect } from 'react';
import descArrays from '../../util/constants/Description';
import { ConfigProvider, Tag } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { getTheme } from '../../util/functions/ThemeFunction';
import StyleTotal from './cssAddTagComponent';
import { setHandleSubmit } from '../../redux/Slice/ModalHOCSlice';

const AddTagComponent = (Props: any) => {
  const dispatch = useDispatch();

  // Lấy theme từ LocalStorage chuyển qua css
  const { change } = useSelector((state: any) => state.themeReducer);
  const { themeColor } = getTheme();
  const { themeColorSet } = getTheme();

  const descArray = [...descArrays];

  const [addTagArr, setAddTagArr] = React.useState<any>([...Props.descriptions]);

  let addTagArrTemp = [...addTagArr];

  const handleSubmit = () => {
    Props.callback(addTagArr);
  };

  useEffect(() => {
    dispatch(setHandleSubmit(handleSubmit));
  }, [addTagArr]);

  return (
    <ConfigProvider
      theme={{
        token: themeColor,
      }}
    >
      <StyleTotal theme={themeColorSet}>
        <div className="flex flex-wrap">
          {descArray.map((item, index) => (
            <span
              key={index}
              className={
                addTagArr?.indexOf(item.title) !== -1
                  ? 'itemAddTag mx-2 my-2 px-4 py-2 active'
                  : 'itemAddTag mx-2 my-2 px-4 py-2'
              }
              onClick={(e) => {
                if (addTagArr?.includes(item.title)) {
                  //   addTagArr.splice(addTagArr.indexOf(item.title), 1);
                  setAddTagArr(addTagArrTemp.filter((i: any) => i !== item.title));
                  return;
                } else {
                  //   addTagArr.push(item.title);
                  setAddTagArr([...addTagArr, item.title]);
                  addTagArrTemp = [...addTagArr, item.title];
                  return;
                }
              }}
            >
              <span className="mr-2">{item.svg}</span>
              <span>{item.title}</span>
            </span>
          ))}
        </div>
      </StyleTotal>
    </ConfigProvider>
  );
};

export default AddTagComponent;

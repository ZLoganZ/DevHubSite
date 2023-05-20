import React, { useEffect, useState } from 'react';
import contactArrays from '../../util/constants/Contact';
import { ConfigProvider, Tag, Dropdown, Button, Input, Avatar, Tooltip } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { getTheme } from '../../util/functions/ThemeFunction';
import StyleTotal from './cssAddLinkComponent';
import { closeModal, setHandleSubmit } from '../../redux/Slice/ModalHOCSlice';
import { DownOutlined } from '@ant-design/icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashCan, faPlus, faInfo } from '@fortawesome/free-solid-svg-icons';
import { forEach, set } from 'lodash';
import { a } from '../../util/functions/UtilFunction';
import { hover } from '@testing-library/user-event/dist/hover';
const AddLinkComponent = (Props: any) => {
  const dispatch = useDispatch();

  // Lấy theme từ LocalStorage chuyển qua css
  const { change } = useSelector((state: any) => state.themeReducer);
  const { themeColor } = getTheme();
  const { themeColorSet } = getTheme();

  const contactArray = [...contactArrays];

  //add links
  const [addLinkArr, setAddLinkArr] = useState([...Props.links]);

  let addLinkArrTemp = addLinkArr.map((obj) => ({ ...obj }));

  //add tooltips
  const [addTooltips, setAddTooltips] = useState([...Props.links]);

  let addTooltipsTemp = addTooltips.map((obj) => ({ ...obj }));

  //save
  const [save, setSave] = useState<boolean>(false);

  const handleSubmit = () => {
    Props.callback(addLinkArr);
  };
  const handleDropClick = (e: any, index: any) => {
    if (addTooltipsTemp[index].tooltip === contactArray[parseInt(addTooltipsTemp[index].key)].label) {
      switch (e.key) {
        case '0':
          addTooltipsTemp[index].tooltip = contactArray[0].label;
          break;
        case '1':
          addTooltipsTemp[index].tooltip = contactArray[1].label;
          break;
        case '2':
          addTooltipsTemp[index].tooltip = contactArray[2].label;
          break;
        case '3':
          addTooltipsTemp[index].tooltip = contactArray[3].label;
          break;
        case '4':
          addTooltipsTemp[index].tooltip = contactArray[4].label;
          break;
      }
    }

    addTooltipsTemp[index].key = e.key;
    addLinkArrTemp[index].key = addTooltipsTemp[index].key;
    addLinkArrTemp[index].tooltip = addTooltipsTemp[index].tooltip;

    // if (handleAddLink(addLinkArrTemp[index].link, e.key)) {
    setAddLinkArr(addLinkArrTemp);
    setAddTooltips(addTooltipsTemp);
    // } else {
    // addLinkArrTemp[index].link = '';
    // setAddLinkArr(addLinkArrTemp);
    // }
  };

  const handleDelete = (index: any) => {
    addLinkArrTemp.splice(index, 1);
    setAddLinkArr(addLinkArrTemp);

    addTooltipsTemp.splice(index, 1);
    setAddTooltips(addTooltipsTemp);
  };

  const handleEnterLink = (e: any, index: any, key: any) => {
    if (isValidLink(e.target.value)) {
      addLinkArrTemp[index].link = e.target.value;
      // addLinkArrTemp[index].tooltip = addTooltipsTemp[index].tooltip;

      // if (handleAddLink(addLinkArrTemp[index].link, key)) {
      setAddLinkArr(addLinkArrTemp);
      // }
    }
  };

  const isValidLink = (link: string): boolean => {
    try {
      new URL(link);
      return true;
    } catch (error) {
      return false;
    }
  };

  const handleAddLink = (link: any, key: any) => {
    if (!link) return false;
    if (
      link.startsWith(contactArray[parseInt(key)].linkDefault) &&
      link.length > contactArray[parseInt(key)].linkDefault.length
    ) {
      return true;
    }
    return false;
  };

  const handleClickSubmit = () => {
    addLinkArrTemp = addLinkArrTemp.filter((item: any) => isValidLink(item.link) && handleAddLink(item.link, item.key));
  };

  function handleShowTooltip(index: any) {
    addTooltipsTemp[index].state = !addTooltipsTemp[index].state;
    setAddTooltips(addTooltipsTemp);
  }

  useEffect(() => {
    setSave(false);
    handleSubmit();
  }, [save]);

  return (
    <ConfigProvider
      theme={{
        token: themeColor,
      }}
    >
      <StyleTotal theme={themeColorSet}>
        <div className="flex flex-col">
          {addLinkArrTemp.map((item: any, index: any) => (
            <div className="flex flex-row items-center mb-2">
              <Dropdown
                menu={{
                  items: contactArray,
                  onClick: (e) => {
                    handleDropClick(e, index);
                  },
                }}
                trigger={['click']}
              >
                <a onClick={(e) => e.preventDefault()}>
                  <Button
                    className="flex items-center"
                    size="large"
                    style={{
                      maxWidth: 200,
                      width: 100,
                      fontWeight: 600,
                      fontSize: 16,
                      color: themeColorSet.colorText1,
                    }}
                  >
                    <Avatar className="item" icon={contactArray[parseInt(item.key)].icon} />
                    <DownOutlined style={{}} />
                  </Button>
                </a>
              </Dropdown>
              <Input
                key={index}
                className="w-full ml-2 pl-2 inputlink"
                placeholder={contactArray[parseInt(item.key)].linkDefault}
                defaultValue={addLinkArr[index]?.link}
                inputMode="url"
                onChange={(e) => {
                  handleEnterLink(e, index, item.key);
                }}
                style={{
                  height: 38,
                  backgroundColor: themeColorSet.colorBg2,
                  border: '1px solid',
                  borderColor: themeColorSet.colorBg4,
                  color: themeColorSet.colorText1,
                  borderRadius: 8,
                }}
              />
              <Input
                key={index}
                className={
                  addTooltips[index].state ? 'w-full ml-2 pl-2 inputlink' : 'w-full ml-2 pl-2 inputlink hidden'
                }
                inputMode="text"
                value={addTooltips[index]?.tooltip}
                onChange={(e) => {
                  addTooltipsTemp[index].tooltip = e.target.value;
                  setAddTooltips(addTooltipsTemp);

                  addLinkArrTemp[index].tooltip = addTooltipsTemp[index].tooltip;
                  setAddLinkArr(addLinkArrTemp);
                }}
                style={{
                  height: 38,
                  backgroundColor: themeColorSet.colorBg2,
                  border: '1px solid',
                  borderColor: themeColorSet.colorBg4,
                  color: themeColorSet.colorText1,
                  borderRadius: 8,
                }}
              />
              <Tooltip title="Click to edit tooltip">
                <Button
                  className="icon-edit-tooltip ml-3"
                  shape="circle"
                  style={{ border: 'none', backgroundColor: themeColorSet.colorBg3 }}
                  onClick={() => {
                    handleShowTooltip(index);
                  }}
                >
                  <FontAwesomeIcon icon={faInfo} className="w-4 h-4" />
                </Button>
              </Tooltip>
              <Tooltip title="Remove" autoAdjustOverflow style={{ transition: 'all 1.5s' }}>
                <Button
                  className="icon-trash"
                  style={{ border: 'none' }}
                  onClick={() => {
                    handleDelete(index);
                  }}
                >
                  <FontAwesomeIcon icon={faTrashCan} className="w-5 h-5" />
                </Button>
              </Tooltip>
            </div>
          ))}
          <Button
            className="mb-2"
            onClick={() => {
              setAddLinkArr([...addLinkArr, { key: '0', tooltip: 'Facebook', link: '' }]);
              addLinkArrTemp = [...addLinkArr, { key: '0', tooltip: 'Facebook', link: '' }];
              // console.log(addTooltips, addTooltipsTemp);

              setAddTooltips([...addTooltips, { key: '0', tooltip: 'Facebook', state: false }]);
              addTooltipsTemp = [...addTooltips, { key: '0', tooltip: 'Facebook', state: false }];
              // console.log(addTooltips, addTooltipsTemp);
            }}
          >
            <FontAwesomeIcon icon={faPlus} className="mr-2" />
            Add
          </Button>
          <Button
            className="mb-2"
            onClick={() => {
              handleClickSubmit();
              setAddLinkArr(addLinkArrTemp);
              dispatch(closeModal(setSave(true)));
            }}
            style={{
              backgroundColor: themeColorSet.colorBg4,
              color: themeColorSet.colorText1,
            }}
          >
            UPDATE
          </Button>
        </div>
      </StyleTotal>
    </ConfigProvider>
  );
};

export default AddLinkComponent;

import React, { Fragment } from 'react';
import { Form, InputGroup, InputGroupAddon, InputGroupText, Input, Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap';
import { Button } from '@icedesign/base';
import DatePicker from 'react-datepicker';
import moment from 'moment';
import 'react-datepicker/dist/react-datepicker.css';

const AddMaterial = ({shouldOpen, toggle, addPlan, updatePlan, formData, setFormData, record, materialTypes}) => {
  const { opType } = record || {};
  const isRead = opType === 'read';
  const isUpdate = opType === 'update';
  return (
  <Fragment>
    <Modal
      isOpen={shouldOpen}  
      toggle={toggle}
    >
      <ModalHeader toggle={toggle}>{
        isRead ? '投放计划信息' : (isUpdate ? '投放计划修改' : '新增投放计划')
      }</ModalHeader>
      <ModalBody>
        <InputGroup className="mb-4">
          <InputGroupAddon addonType="prepend">
            <InputGroupText>
              投放名称
            </InputGroupText>
          </InputGroupAddon>
          <Input type="text" placeholder="请输入投放名称" 
            disabled={isRead ? 'disabled' : false}
            defaultValue={isRead || isUpdate ? formData && formData.launchPlanName : ''}
            onChange={e => {
              setFormData({launchPlanName: e.target.value});
            }}
          />
        </InputGroup>
        <InputGroup className="mb-4">
          <InputGroupAddon addonType="prepend">
            <InputGroupText>
              投放类型
            </InputGroupText>
          </InputGroupAddon>
          <Input type="text"
            disabled
            readOnly
            defaultValue={formData && formData.interactionTypeName || ''}
          />
        </InputGroup>
        <InputGroup className="mb-4">
          <InputGroupAddon addonType="prepend">
            <InputGroupText>
              投放素材
            </InputGroupText>
          </InputGroupAddon>
          <Input type="select"
            disabled={isRead ? 'disabled' : false}
            defaultValue={isRead || isUpdate ? formData && formData.creativeId : ''}
            onChange={e => {
              setFormData({creativeId: e.target.value});
            }}
          >
            {
              materialTypes && Array.isArray(materialTypes) && materialTypes.length > 0 && materialTypes.map((mt, idx) => (
                <option key={idx} value={mt.creativeId}>{mt.creativeName}</option>
              ))
            }
          </Input>
        </InputGroup>
        <InputGroup className="mb-4">
          <InputGroupAddon addonType="prepend">
            <InputGroupText>
              投放视频id
            </InputGroupText>
          </InputGroupAddon>
          <Input type="text" placeholder="请输入投放视频id" 
            disabled={isRead ? 'disabled' : false}
            defaultValue={isRead || isUpdate ? formData && formData.launchVideoId : ''}
            onChange={e => {
              setFormData({launchVideoId: e.target.value});
            }}
          />
        </InputGroup>
        <InputGroup className="mb-4">
          <InputGroupAddon addonType="prepend">
            <InputGroupText>
              投放时间类型
            </InputGroupText>
          </InputGroupAddon>
          <Input type="select"
            disabled={isRead ? 'disabled' : false}
            defaultValue={isRead || isUpdate ? formData && formData.launchTimeType : ''}
            onChange={e => {
              setFormData({launchTimeType: e.target.value});
            }}
          >
            <option value='default'>请选择</option>
            <option value='1'>即时</option>
            <option value='0'>视频时间</option>
            <option value='2'>北京时间</option>
          </Input>
        </InputGroup>
        {
          formData && formData.launchTimeType && formData.launchTimeType !== 'default' ? (
            <Fragment>
              <InputGroup className="mb-4">
                <InputGroupAddon addonType="prepend">
                  <InputGroupText>
                    投放日期
                  </InputGroupText>
                </InputGroupAddon>
                <DatePicker 
                  selectsStart
                  onChange={e => {}}
                  placeholderText='请选择开始日期'
                />
                <DatePicker 
                  selectsEnd
                  onChange={e => {}}
                  placeholderText='请选择结束日期'
                />
              </InputGroup>
              <InputGroup className="mb-4">
                <InputGroupAddon addonType="prepend">
                  <InputGroupText>
                    投放时间
                  </InputGroupText>
                </InputGroupAddon>
                <DatePicker 
                  showTimeSelect
                  showTimeSelectOnly
                  timeIntervals={5}
                  dateFormat="LT"
                  timeCaption="Time"
                  isClearable={true}
                  onChange={e => {}}
                  placeholderText='请添加投放时间'
                />
                <Button>+</Button>
              </InputGroup>
              <InputGroup className="mb-4">
                <InputGroupAddon addonType="prepend">
                  <InputGroupText>
                    投放时长
                  </InputGroupText>
                </InputGroupAddon>
                <Input type="select"
                  disabled={isRead ? 'disabled' : false}
                  defaultValue={isRead || isUpdate ? formData && formData.launchTimeType : ''}
                  onChange={e => {
                    setFormData({launchTimeType: e.target.value});
                  }}
                >
                  <option value='10'>10秒</option>
                  <option value='20'>20秒</option>
                  <option value='30'>30秒</option>
                  <option value='60'>60秒</option>
                  <option value='120'>120秒</option>
                  <option value='自定义'>自定义</option>
                </Input>
              </InputGroup>
            </Fragment>
          ) : null
        }
      </ModalBody>
      <ModalFooter>
        <Button onClick={toggle}>取消</Button>
        <Button type="primary" onClick={() => {
          if (isUpdate) {
            updatePlan({
            });
          } else if(isRead) {
            toggle && toggle();
          } else {
            addPlan({
            });
          }
        }}>{ isUpdate ? '确认修改' : (isRead ? '确认' : '确认新增')}</Button>
      </ModalFooter>
    </Modal>  
  </Fragment>
)};

export default AddMaterial;
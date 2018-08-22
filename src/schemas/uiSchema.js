import React from 'react';
import { Input } from 'reactstrap';

const uiSchema = ({addMaterialFile}) => {
  return {
    interactionTypeId: {
      "ui:disabled": [""],
    },
    monitorLinks: {
      "ui:options": {
        "orderable": false
      },
      items: {
        "ui:emptyValue": ""
      }
    },
    display_img: {
      "ui:widget": (props) => {  
        return (
          <Input 
            type="file"
            onChange={(e) => {
              addMaterialFile({file: e.target.files[0], type: 'display_img'});
            }}
          />
        )
      }
    },
    award_img: {
      "ui:widget": (props) => {  
        return (
          <Input 
            type="file"
            onChange={(e) => {
              addMaterialFile({file: e.target.files[0], type: 'award_img'});
            }}
          />
        )
      }
    },
    countdown_img: {
      "ui:widget": (props) => {  
        return (
          <Input 
            type="file"
            onChange={(e) => {
              addMaterialFile({file: e.target.files[0], type: 'countdown_img'});
            }}
          />
        )
      }
    }
  };  
};

export default uiSchema;
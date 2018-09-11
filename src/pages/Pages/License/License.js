import React, { Component } from 'react';

class License extends Component {

  render() {
    return (
        <div className="app"
          style={{
            position: 'relative',
            height: '100%',  
          }}
        >
          <p>license申请说明：</p>
          <p>Video++提供测试版本的长链接和cdn资源，用accesskey和accessSecret来接入，用户享有使用产品的权利，原著权所属上海极链科技有限公司(Video++)。</p>
          <strong>联系方式：<a href="tel:4008089578">400-8089-578</a></strong>
        </div>  
      )  
  }  
}

export default License;
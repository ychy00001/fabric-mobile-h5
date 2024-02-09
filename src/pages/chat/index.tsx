import { View, Text, Image } from '@tarojs/components'
import { Component, FC, memo, useEffect, useState } from "react";
import Taro, { useLoad,  } from '@tarojs/taro'
import './index.scss'
import { AtButton, AtTextarea } from 'taro-ui'
import { MessageBox, Input } from "react-chat-elements";
import testImg from "../../assets/images/testImg.png";

interface ChatInfoState {
  id: number;
  avatar: string;
  name: string;
  text: string;
  position: string;
  imgUrl?: string;
}

type PropsType = {

}
type StateType = {
  chatInfoList : ChatInfoState[],
  inputValue: string
}

interface Index {
  props: PropsType,
  state: StateType
}
class Index extends Component{

  // state的初始化在constructor中
  constructor (props) {
    super(props)
    // 初始化
    this.state = {
      chatInfoList:[
        {
          id: 1,
          avatar: "xxx.png",
          name: "ChatBot",
          text: "你好，我是智能海报机器，请输入需要生成海报的行业",
          position: "left",
        },
      ],
      inputValue: ""
    }
  }

  componentDidShow () {
  }

  useLoad(){
    console.log('Page loaded.')
  }

  useEffect() {
    
  };

  editTemplate = (tmpId : string | void) => {
    // 跳转到编辑页面
    Taro.navigateTo({
      url: '/pages/poster_editor/index?tmpId=' + tmpId,
    })
  }

  handleMsgChange (inputValue) {
    this.setState({
      inputValue
    })
  }

  sendMsg = () => {
    let { chatInfoList } = this.state;
    const msg = this.state.inputValue;
    let sysImg = "";
    if(msg.length == 0){
      return;
    }
    if(msg.length > 5){
      sysImg = testImg
      console.log(sysImg)
    }
    chatInfoList = chatInfoList.concat([
      {
        id: chatInfoList.length + 1,
        avatar: "xxx.png",
        name: "User",
        text: msg,
        position: "right"
      },
      {
        id: chatInfoList.length + 2,
        avatar: "xxx.png",
        name: "User",
        text: "功能待开发......",
        position: "left",
        imgUrl: sysImg,
      }]);
    this.setState({
      chatInfoList
    })
  }

  newTemplate = () => {
    // 跳转到编辑页面
    Taro.navigateTo({
      url: '/pages/poster_editor/index?tmpId='
    })
  }

  ChatListView = () => {
    return (
      <>
        {this.state.chatInfoList.length > 0 ? (
          <View className="temp-list-view at-row at-row--wrap">
            {this.state.chatInfoList.map((item: any) => {
              let _msgType = "text"
              let _data = {}
              if(item.imgUrl && item.imgUrl.length > 0){
                _msgType = "photo"
                _data = {
                  uri: item.imgUrl,
                  width: 200,
                  height: 200
                }
                console.log(_data)
              }
              return (
                <MessageBox 
                  className="at-col at-col-12"
                  id={item.id}
                  key={item.id}
                  position={item.position}
                  title={item.name}
                  type={_msgType}
                  data={_data}
                  text={item.text}
                  date={new Date()}
                  // onClick={() => this.editTemplate(item.templateId)}
                />
              )
            })}
          </View>
        ) : (
          <View className="empty-text at-row at-row--wrap">暂无信息...</View>
        )}
      </>
    );
  };

  render () {
    return (
      <View className="index">
          <View className="panel">
            <View className="panel_title">  
              AI智能生成海报
            </View>
            <View className="panel_content">
              <this.ChatListView />
            </View>
            <View className="panel_bottom">
              <AtTextarea
                className="chat-input"
                placeholder='请输入你想要生成的海报的相关信息'
                value={this.state.inputValue}
                onChange={this.handleMsgChange.bind(this)}
                maxLength={200}
              />
              <AtButton 
                className="at-row" 
                type="secondary" 
                onClick={this.sendMsg}>
                  发送
              </AtButton>
            </View>
          </View>
      </View>
    )
  }
}


export default Index
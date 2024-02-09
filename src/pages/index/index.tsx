import { View, Text, Image } from '@tarojs/components'
import { Component, FC, memo, useEffect, useState } from "react";
import Taro, { useLoad,  } from '@tarojs/taro'
import './index.scss'
import { AtButton } from 'taro-ui'

interface ImgInfoState {
  base64: string;
  templateId: string;
}

type PropsType = {

}
type StateType = {
  recommendImgInfoList : ImgInfoState[]
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
      recommendImgInfoList:[]
    }
  }

  componentDidShow () {
    this.renderTemplateList()
  }

  useLoad(){
    console.log('Page loaded.')
  }

  useEffect() {
    
  };

  renderTemplateList () {
    let imgList: ImgInfoState[] = []
    let templatePosterMap = JSON.parse(localStorage.getItem("tplImgs") || "{}")
    for (var item in templatePosterMap){
      imgList.push({
        base64: templatePosterMap[item],
        templateId: item
      })
    }
    this.setState({
      recommendImgInfoList : imgList
    })
  }

  editTemplate = (tmpId : string) => {
    // 跳转到编辑页面
    Taro.navigateTo({
      url: '/pages/poster_editor/index?tmpId=' + tmpId,
    })
  }

  newTemplate = () => {
    // 跳转到编辑页面
    Taro.navigateTo({
      url: '/pages/poster_editor/index?tmpId='
    })
  }

  RecommendImgListView = () => {
    return (
      <>
        {this.state.recommendImgInfoList.length > 0 ? (
          <View className="temp-list-view at-row at-row--wrap">
            {this.state.recommendImgInfoList.map((item: any) => (
              <Image
                className="at-col at-col-4"
                key={item.templateId}
                src={item.base64}
                style={{ width: "31.3vw", height: "48vw" }}
                onClick={() => this.editTemplate(item.templateId)}
              />
            ))}
          </View>
        ) : (
          <View className="empty-text at-row at-row--wrap">暂无模板...</View>
        )}
      </>
    );
  };

  render () {
    return (
      <View className="index">
          <View className="panel">
            <View className="panel_title">  
              推荐列表
            </View>
            <View className="panel_content">
              <this.RecommendImgListView />
            </View>
          </View>
          <AtButton type="secondary" onClick={this.newTemplate}>新建模版</AtButton>
      </View>
    )
  }
}


export default Index


import React, { Component } from 'react'
import FontAwesome from 'react-fontawesome';
import { connect } from 'dva'
import moment from 'moment'
import BooleanOption from 'components/BooleanOption';
import { Row, Col, Icon, Card, Tabs, Table, Radio, DatePicker, Tooltip, Menu, Dropdown,Badge, Switch,Select,Form,AutoComplete,Modal } from 'antd'
import { Link, Route, Redirect} from 'dva/router'
import numeral from 'numeral'
import {
  ChartCard, yuan, MiniArea, MiniBar, MiniProgress, Field, Bar, Pie, TimelineChart,
} from '../../components/Charts'
import Trend from '../../components/Trend'
import NumberInfo from '../../components/NumberInfo'
import { getTimeDistance } from '../../utils/utils'
import PageHeaderLayout from '../../layouts/PageHeaderLayout'
import styles from './StockCountIssueTrack.dashboard.less'
import DescriptionList from '../../components/DescriptionList';
import ImagePreview from '../../components/ImagePreview';
import GlobalComponents from '../../custcomponents';
import DashboardTool from '../../common/Dashboard.tool'
import appLocaleName from '../../common/Locale.tool'

const {aggregateDataset,calcKey, defaultHideCloseTrans,
  defaultImageListOf,defaultSettingListOf,defaultBuildTransferModal,
  defaultExecuteTrans,defaultHandleTransferSearch,defaultShowTransferModel,
  defaultRenderExtraHeader,
  defaultSubListsOf,
  defaultRenderExtraFooter,renderForTimeLine,renderForNumbers
}= DashboardTool



const { Description } = DescriptionList;
const { TabPane } = Tabs
const { RangePicker } = DatePicker
const { Option } = Select


const imageList =(stockCountIssueTrack)=>{return [
	 ]}

const internalImageListOf = (stockCountIssueTrack) =>defaultImageListOf(stockCountIssueTrack,imageList)

const optionList =(stockCountIssueTrack)=>{return [ 
	]}

const buildTransferModal = defaultBuildTransferModal
const showTransferModel = defaultShowTransferModel
const internalSettingListOf = (stockCountIssueTrack) =>defaultSettingListOf(stockCountIssueTrack, optionList)
const internalLargeTextOf = (stockCountIssueTrack) =>{

	return null
	

}


const internalRenderExtraHeader = defaultRenderExtraHeader

const internalRenderExtraFooter = defaultRenderExtraFooter
const internalSubListsOf = defaultSubListsOf


const internalRenderTitle = (cardsData,targetComponent) =>{
  
  
  const linkComp=cardsData.returnURL?<Link to={cardsData.returnURL}> <FontAwesome name="arrow-left"  /> </Link>:null
  return (<div>{linkComp}{cardsData.cardsName}: {cardsData.displayName}</div>)

}


const internalSummaryOf = (stockCountIssueTrack,targetComponent) =>{
	
	
	const {StockCountIssueTrackService} = GlobalComponents
	const userContext = null
	return (
	<DescriptionList className={styles.headerList} size="small" col="4">
<Description term="序号">{stockCountIssueTrack.id}</Description> 
<Description term="头衔">{stockCountIssueTrack.title}</Description> 
<Description term="计数时间">{ moment(stockCountIssueTrack.countTime).format('YYYY-MM-DD')}</Description> 
<Description term="概览">{stockCountIssueTrack.summary}</Description> 
<Description term="盘点">{stockCountIssueTrack.stockCount==null?appLocaleName(userContext,"NotAssigned"):`${stockCountIssueTrack.stockCount.displayName}(${stockCountIssueTrack.stockCount.id})`}
 <Icon type="swap" onClick={()=>
  showTransferModel(targetComponent,"盘点","goodsShelfStockCount",StockCountIssueTrackService.requestCandidateStockCount,
	      StockCountIssueTrackService.transferToAnotherStockCount,"anotherStockCountId",stockCountIssueTrack.stockCount?stockCountIssueTrack.stockCount.id:"")} 
  style={{fontSize: 20,color:"red"}} />
</Description>
	
        {buildTransferModal(stockCountIssueTrack,targetComponent)}
      </DescriptionList>
	)

}


class StockCountIssueTrackDashboard extends Component {

 state = {
    transferModalVisiable: false,
    candidateReferenceList: {},
    candidateServiceName:"",
    candidateObjectType:"city",
    targetLocalName:"",
    transferServiceName:"",
    currentValue:"",
    transferTargetParameterName:"",  
    defaultType: 'stockCountIssueTrack'


  }
  componentDidMount() {

  }
  

  render() {
    // eslint-disable-next-line max-len
    const { id,displayName,  } = this.props.stockCountIssueTrack
    if(!this.props.stockCountIssueTrack.class){
      return null
    }
    const returnURL = this.props.returnURL
    
    const cardsData = {cardsName:"库存计数问题跟踪",cardsFor: "stockCountIssueTrack",
    	cardsSource: this.props.stockCountIssueTrack,returnURL,displayName,
  		subItems: [
    
      	],
  	};
    
    const renderExtraHeader = this.props.renderExtraHeader || internalRenderExtraHeader
    const settingListOf = this.props.settingListOf || internalSettingListOf
    const imageListOf = this.props.imageListOf || internalImageListOf
    const subListsOf = this.props.subListsOf || internalSubListsOf
    const largeTextOf = this.props.largeTextOf ||internalLargeTextOf
    const summaryOf = this.props.summaryOf || internalSummaryOf
    const renderTitle = this.props.renderTitle || internalRenderTitle
    const renderExtraFooter = this.props.renderExtraFooter || internalRenderExtraFooter
    return (

      <PageHeaderLayout
        title={renderTitle(cardsData,this)}
        content={summaryOf(cardsData.cardsSource,this)}
        wrapperClassName={styles.advancedForm}
      >
      {renderExtraHeader(cardsData.cardsSource)}
        <div>
        {settingListOf(cardsData.cardsSource)}
        {imageListOf(cardsData.cardsSource)}
        {subListsOf(cardsData)} 
        {largeTextOf(cardsData.cardsSource)}
          
        </div>
      </PageHeaderLayout>
    )
  }
}

export default connect(state => ({
  stockCountIssueTrack: state._stockCountIssueTrack,
  returnURL: state.breadcrumb.returnURL,
  
}))(Form.create()(StockCountIssueTrackDashboard))


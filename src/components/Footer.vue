<template>
  <div class="footer">
    <div class="footer-service">
      <ul>
        <li>
          <a>
            <el-icon>
              <Tools />
            </el-icon>
            预约维修服务
          </a>
        </li>
        <li>
          <a>
            <el-icon>
              <RefreshRight />
            </el-icon>
            7天无理由退货
          </a>
        </li>
        <li><a>
            <el-icon>
              <RefreshLeft />
            </el-icon>
            15天免费换货
          </a></li>
        <li><a>
            <el-icon>
              <Cellphone />
            </el-icon>
            满69元包邮
          </a></li>
        <li><a>
            <el-icon>
              <Location />
            </el-icon>
            1100余家售后网点
          </a></li>
      </ul>
    </div>
    <div class="footer-links">
      <dl>
        <dt>选购指南</dt>
        <dd><a>手机</a></dd>
        <dd><a>电视</a></dd>
        <dd><a>笔记本</a></dd>
        <dd><a>平板</a></dd>
        <dd><a>穿戴</a></dd>
        <dd><a>耳机</a></dd>
        <dd><a>家电</a></dd>
        <dd><a>路由器</a></dd>
        <dd><a>音响</a></dd>
      </dl>
      <dl>
        <dt>服务中心</dt>
        <dd><a>申请售后</a></dd>
        <dd><a>售后政策</a></dd>
        <dd><a>维修服务价格</a></dd>
        <dd><a>订单查询</a></dd>
        <dd><a>以旧换新</a></dd>
        <dd><a>保证服务</a></dd>
        <dd><a>防伪查询</a></dd>
        <dd><a>F码通行</a></dd>
      </dl>
      <dl>
        <dt>线下门店</dt>
        <dd><a>小米之家</a></dd>
        <dd><a>服务网点</a></dd>
        <dd><a>授权体验店/专区</a></dd>
      </dl>
      <dl>
        <dt>关于小米</dt>
        <dd><a>了解小米</a></dd>
        <dd><a>加入小米</a></dd>
        <dd><a>投资者关系</a></dd>
        <dd><a>环境、社会及管治</a></dd>
        <dd><a>廉洁举报</a></dd>
      </dl>
      <dl>
        <dt>关注我们</dt>
        <dd><a>新浪微博</a></dd>
        <dd><a>官方微信</a></dd>
        <dd><a>联系我们</a></dd>
        <dd><a>公益基金会</a></dd>
      </dl>
      <div class="col-contact">
        <p class="phone-number">400-100-5678</p>
        <p class="phone-time">8:00-18:00(仅收市话费)</p>
        <a>
          <el-icon>
            <ChatDotSquare />
          </el-icon>
          人工客服
        </a>
      </div>
    </div>
    <div class="footer-site-info">
      <div class="logo-box"></div>
      <div class="footer-box">
        <div class="site">
          <ul>
            <li>小米</li>
            <li>MIUI</li>
            <li>米家</li>
            <li>米聊</li>
            <li>多看</li>
            <li>游戏</li>
            <li>政企服务</li>
            <li>小米天猫店</li>
            <li>小米集团隐私政策</li>
            <li>小米公司儿童信息保护规则</li>
            <li>小米商城隐私政策</li>
            <li>小米商城用户协议</li>
            <li>问题反馈</li>
            <li>Select Location</li>
          </ul>
        </div>
        <div class="site">
          <ul>
            <li>北京互联网法院法律服务工作站</li>
            <li>中国消费者协会</li>
            <li>北京市消费者协会</li>
          </ul>
        </div>
        <p>
          © mi.com 京ICP证110507号 京ICP备10046444号 京公网安备11010802020134号 京网文[2020]0276-042号
          <br>
          （京）网械平台备字（2018）第00005号 互联网药品信息服务资格证 (京)-非经营性-2014-0090 营业执照 医疗器械质量公告
          <br>
          增值电信业务许可证 网络食品经营备案 京食药网食备202010048 食品经营许可证
          <br>
          违法和不良信息举报电话：171-5104-4404 知识产权侵权投诉 本网站所列数据，除特殊说明，所有数据均出自我司实验室测试
        </p>
        <div class="info-links">
          <img src="../../public/images/底部品牌/Test1.png" alt="">
          <img src="../../public/images/底部品牌/Test2.png" alt="">
          <img src="../../public/images/底部品牌/Test3.png" alt="">
          <img src="../../public/images/底部品牌/Test4.png" alt="">
          <img src="../../public/images/底部品牌/Test5.png" alt="">
        </div>
        <div class="slogin">让全球每个人都能享受科技带来的美好生活</div>
      </div>
    </div>
  </div>
</template>

<script setup lang='ts'>

</script>
<style scoped lang='less'>
.footer {
  min-width: 1200px;
  display: flex;
  flex-direction: column;
  align-items: center;

  .footer-service {
    height: 80px;
    display: flex;
    align-items: center;
    border-bottom: 1px solid rgb(224, 224, 224);

    ul {
      display: flex;

      li {
        a {
          display: flex;
          align-items: center;
          margin: auto;
          padding: 0 40px;
          border-right: 1px solid #ccc;
          font-size: 16px;
          cursor: pointer;
          transition: .3s;
          color: #7b8585;
          white-space: nowrap;

          &:hover {
            color: rgb(255, 103, 0);
          }

          .el-icon {
            font-size: 30px;
          }

        }

        &:last-child a {
          border: none;
        }
      }
    }
  }

  .footer-links {
    margin-top: 30px;
    display: flex;

    dl {
      width: 160px;

      dt {
        color: #424242;
        margin-bottom: 30px;
      }

      dd a {
        display: block;
        cursor: pointer;
        margin-bottom: 10px;
        font-size: 13px;
        color: rgb(117, 117, 117);
        transition: .3s;

        &:hover {
          color: rgb(255, 103, 0);
        }
      }
    }

    .col-contact {
      width: 251px;
      height: 90px;
      display: flex;
      flex-direction: column;
      align-items: center;
      border-left: 1px solid #ccc;

      .phone-number {
        font-size: 22px;
        color: #ff6700;
      }

      .phone-time {
        margin: 5px 0;
        font-size: 13px;
        color: rgb(97, 97, 97);
      }

      a {
        display: flex;
        width: 120px;
        height: 30px;
        justify-content: center;
        align-items: center;
        border: 1px solid #ff6700;
        font-size: 13px;
        color: #ff6700;
        cursor: pointer;
        transition: .3s;

        &:hover {
          background-color: #ff6700;
          color: white;
        }

        .el-icon {
          font-size: 16px;
        }
      }
    }
  }

  .footer-site-info {
    width: 1200px;
    padding-top: 30px;
    display: flex;
    background-color: #fafafa;
    justify-content: center;
    border-top: 1px solid #fafafa;
    .logo-box {
        margin-right: 10px;
        width: 56px;
        height: 56px;
        background: url(https://s02.mifile.cn/assets/static/image/logo-mi2.png) no-repeat;
        background-size: contain;
    }
    .footer-box {
      display: flex;
      flex-direction: column;
      align-items: center;
      .site {

        ul {
          width: 1146px;
          display: flex;
          font-size: 13px;
          color: #757575;

          li {
            cursor: pointer;
            padding: 0 8px;
            border-right: 1px solid #ccc;

            &:hover {
              color: #ff6700;
            }

            &:last-child {
              border: none;
            }

            &:first-child {
              padding-left: 0;
            }
          }
        }

      }

      p {
        width: 1146px;
        white-space: pre-wrap;
        font-size: 13px;
        color: #ccc;
        line-height: 20px;
      }

      .info-links {
        width: 1146px;

        img {
          width: 85px;
          height: 28px;
        }
      }

      .slogin {
        position: relative;
        font-family: '楷体';
        margin-top: 20px;
        user-select: none;
        color: #ccc;
      }
    }

  }
}
</style>
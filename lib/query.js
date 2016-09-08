import https from 'https';
import request from 'request';
// Terminal string styling done right. Much color.
import chalk from 'chalk';
import columnify from 'columnify';
import stations from './station.json';

let agentOptions = {};
let agent = null;

agentOptions = {
  host: 'www.12306.cn',
  port: '443',
  path: '/',
  rejectUnauthorized: false
};

agent = new https.Agent(agentOptions);

const headers = {
  transCode: '车次',
  fromStation: '出发站',
  toStation: '到达站',
  startTime: '出发时',
  arriveTime: '到达时',
  lishi: '历时',
  swzNum: '商务座',
  ydzNum: '一等座',
  edzNum: '二等座',
  rwNum: '软卧',
  ywNum: '硬卧',
  yzNum: '硬座',
  wzNum: '无座',
  qtNum: '其它',
  remark: '备注'
};

const headingTransform = (heading) => {
  return chalk.bold.yellow(`${chalk.bold.yellow(headers[heading])}\n${chalk.bold.yellow('------')}`);
};

const printDataAttr = (num) => {
  if (num === '无' || num === '--' || num === '*') {
    return chalk.gray(num);
  }
  return num;
};

const printDataItem = (item) => {
  return {
    transCode: item.station_train_code,
    fromStation: item.from_station_name,
    toStation: item.to_station_name,
    startTime: item.controlled_train_flag === '0' ? item.start_time : chalk.gray('--'),
    arriveTime: item.controlled_train_flag === '0' ? item.arrive_time : chalk.gray('--'),
    lishi: item.controlled_train_flag === '0' ? item.lishi : chalk.gray('--'),
    swzNum: printDataAttr(item.swz_num),
    ydzNum: printDataAttr(item.zy_num),
    edzNum: printDataAttr(item.ze_num),
    rwNum: printDataAttr(item.rw_num),
    ywNum: printDataAttr(item.yw_num),
    yzNum: printDataAttr(item.yz_num),
    wzNum: printDataAttr(item.wz_num),
    qtNum: printDataAttr(item.qt_num),
    remark: item.controlled_train_flag === '1' ? chalk.gray(item.controlled_train_message) : ''
  };
};

const query = (frm, to, queryDate, param) => {
  let purposeCode = param.purposeCode;
  if (!purposeCode) {
    purposeCode = 'ADULT';
  }
  // https://kyfw.12306.cn/otn/leftTicket/queryT?leftTicketDTO.train_date=2016-09-01&leftTicketDTO.from_station=HZH&leftTicketDTO.to_station=XCH&purpose_codes=ADULT
  //
  const url = `https://kyfw.12306.cn/otn/leftTicket/queryT?leftTicketDTO.train_date=${queryDate}&leftTicketDTO.from_station=${stations[frm]}&leftTicketDTO.to_station=${stations[to]}&purpose_codes=${purposeCode}`;
  const options = {
    url,
    headers: {
      'User-Agent': 'request'
    },
    agent
  };
  console.log(url);
  console.log(chalk.bold(`执行查询：从 ${frm} 到 ${to}, 日期：${queryDate}...\n`));
  request(options, (err, resp, body) => {
    try {
      if (!err && resp.statusCode === 200) {
        const columnConfig = {};
        Object.keys(headers).forEach(k => {
          columnConfig[k] = { headingTransform };
        });

        const data = [];
        body = JSON.parse(body);
        if (body.data) {
          if (param.highway) {
            for (const item of body.data) {
              if (item.queryLeftNewDTO.station_train_code[0] === param.highway.toUpperCase()) {
                data.push(printDataItem(item.queryLeftNewDTO));
              }
            }
          } else {
            body.data.forEach(item => data.push(printDataItem(item.queryLeftNewDTO)));
          }
          console.log(columnify(data, {
            columnSplitter: chalk.gray(' | '),
            config: columnConfig
          }) + '\n');
        } else {
          console.log('没有查到结果');
        }
      } else {
        console.log(1, err);
      }
    } catch (e) {
      console.log(2, e);
    }
  });
};


// const query = function doQuery(frm, to, at) {
//   request12306(frm, to, at);
// };


module.exports = query;

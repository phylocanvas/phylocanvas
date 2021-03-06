require('../src/polyfill');

import PhyloCanvas, * as phyloComponents from '../src/index';

import { undoPointTranslation } from '../src/utils/canvas';

const buttonForm = document.getElementById('buttons');
const tree = PhyloCanvas.createTree('phylocanvas', {
  defaultCollapsed: {
    min: 10,
    max: 50,
    // color: 'rgba(0, 127, 0, 0.5)',
  },
  padding: 0,
  branchLengthLabelPredicate: (node) => node.branchLength > 200,
});

const originalDraw = tree.draw;
tree.draw = (...args) => {
  originalDraw.apply(tree, args);
  const bounds = tree.getBounds();

  const min = undoPointTranslation({ x: bounds[0][0], y: bounds[0][1] }, tree);
  const max = undoPointTranslation({ x: bounds[1][0], y: bounds[1][1] }, tree);
  tree.canvas.strokeRect(
    min.x, min.y, max.x - min.x, max.y - min.y
  );
};

// create buttons
buttonForm.addEventListener('submit', function (e) {
  e.preventDefault();
});

for (const treeType of Object.keys(phyloComponents.treeTypes)) {
  const button = document.createElement('button');
  button.innerHTML = treeType;
  button.addEventListener('click', tree.setTreeType.bind(tree, treeType));
  buttonForm.appendChild(button);
}

const subtreeButton = document.createElement('button');
subtreeButton.innerHTML = 'subtree';
subtreeButton.addEventListener('click', () => {
  const branch = tree.root.children[2];
  branch.redrawTreeFromBranch();
});
document.body.appendChild(subtreeButton);

const rotateButton = document.createElement('button');
rotateButton.innerHTML = 'rotate';
rotateButton.addEventListener('click', () => {
  const branch = tree.root.children[2];
  branch.rotate();
});
document.body.appendChild(rotateButton);

const resetButton = document.createElement('button');
resetButton.innerHTML = 'Redraw Original';
resetButton.addEventListener('click', () => tree.redrawOriginalTree());
document.body.appendChild(resetButton);

const scaleRange = document.createElement('input');
scaleRange.type = 'range';
scaleRange.min = 0.001;
scaleRange.max = 100;
scaleRange.step = 0.001;
scaleRange.addEventListener('change', () => {
  tree.setBranchScale(scaleRange.value);
});
document.body.appendChild(scaleRange);

const zoomLabel = document.createElement('label');
zoomLabel.innerHTML = 'Zoom Enabled';
const zoomCheckbox = document.createElement('input');
zoomCheckbox.type = 'checkbox';
zoomCheckbox.checked = true;
zoomCheckbox.addEventListener('change', (e) => {
  tree.disableZoom = !e.target.checked;
});
zoomLabel.appendChild(zoomCheckbox);
document.body.appendChild(zoomLabel);

const shiftKeyDragLabel = document.createElement('label');
shiftKeyDragLabel.innerHTML = 'Shift-key Drag';
const shiftKeyDragCheckbox = document.createElement('input');
shiftKeyDragCheckbox.type = 'checkbox';
shiftKeyDragCheckbox.checked = false;
shiftKeyDragCheckbox.addEventListener('change', (e) => {
  tree.shiftKeyDrag = e.target.checked;
});
shiftKeyDragLabel.appendChild(shiftKeyDragCheckbox);
document.body.appendChild(shiftKeyDragLabel);


tree.on('error', function (event) { throw event.error; });

tree.on('loaded', function () {
  console.log('loaded');
});

// tree.on('updated', e => console.log(e));

tree.on('click', e => {
  const node = tree.getNodeAtMousePosition(e);
  if (node) {
    node.toggleCollapsed();
    node.cascadeFlag('highlighted', false);
    tree.draw();
  }
});

// tree.alignLabels = true;

tree.setTreeType('circular');

tree.clickFlag = 'highlighted';
tree.clickFlagPredicate = node => node.leaf;

tree.showInternalNodeLabels = true;
tree.showBranchLengthLabels = true;
tree.internalLabelStyle.colour = 'red';

// ./data/tree.nwk
// (A:0.1,B:0.1,(C:0.1,D:0.1):0.1);
tree.load(
  // '(A:0.1,B:0.1,(C:0.1,D:0.1):0.1);',
  '(((0232:2219.0,((4011:1255.0,(4082:3041.0,(5022:1895.0,(3042:12.0,(4350:8.0,4311:2.0)90:2.0)88:970.0)86:676.0)84:611.0)82:1027.0,((4029:8.0,5109:3.0)94:723.0,(((4104:329.0,(3227:250.0,4322:35.0)101:461.0)99:106.0,(4310:483.0,(4380:1137.0,(4273:275.0,(2271:73.0,((2287:12.0,(((0310:15.0,((3024:16.0,2076:1.0)120:4.0,3315:3.0)119:29.0)117:1.0,(5271:26.0,((4166:284.0,5285:357.0)127:13.0,(0305:18.0,(5061:112.0,(3257:1.0,3251:3.0)134:35.0)132:38.0)130:0.0)126:1.0)124:0.0)116:0.0,(0145:26.0,(0058:8.0,0155:4.0)139:12.0)137:0.0)115:0.0)113:0.0,(5235:4.0,4384:0.0)142:133.0)112:1.0)110:88.0)108:114.0)106:262.0)104:61.0)98:77.0,((2142:235.0,((4279:25.0,3210:19.0)149:4.0,((3020:14.0,5050:11.0)153:3.0,(((3286:8.0,(4044:3.0,4285:2.0)160:155.0)158:4.0,(2373:28.0,(4138:26.0,(0281:0.0,0280:0.0)167:4.0)165:58.0)163:8.0)157:4.0,(((2168:23.0,3153:13.0)172:1.0,(3048:95.0,((5053:6.0,(3287:1.0,4269:1.0)180:14.0)178:9.0,0207:27.0)177:5.0)175:3.0)171:1.0,4386:20.0)170:0.0)156:0.0)152:3.0)148:296.0)146:65.0,((3271:4.0,4106:500.0)186:164.0,(4375:3.0,3325:6.0)189:18.0)185:177.0)145:110.0)97:240.0)93:1681.0)81:1142.0)79:1202.0,((2029:3493.0,(0303:63.0,2300:74.0)195:3428.0)193:661.0,(((0315:21.0,(0284:6.0,((3234:5.0,5068:30.0)205:3.0,4246:9.0)204:5.0)202:6.0)200:1119.0,0094:1043.0)199:2417.0,(0304:675.0,((5059:80.0,4100:13.0)213:530.0,(5205:190.0,((4201:6.0,(5225:10.0,(2032:25.0,2333:17.0)223:7.0)221:1.0)219:5.0,0318:5.0)218:482.0)216:351.0)212:599.0)210:2677.0)198:806.0)192:897.0)78:777.0,(((0041:2739.0,(5181:2297.0,(((2311:622.0,(4361:1244.0,((5270:404.0,(4297:216.0,((4214:3.0,4330:69.0)244:17.0,(3300:7.0,0251:0.0)247:0.0)243:21.0)241:162.0)239:241.0,((4150:1080.0,5135:452.0)251:145.0,(4099:430.0,(4164:101.0,(5133:46.0,(5028:50.0,5243:4.0)260:44.0)258:0.0)256:23.0)254:244.0)250:125.0)238:76.0)236:220.0)234:402.0,((4167:4.0,2186:3.0)264:4.0,(5287:22.0,(3099:3.0,5209:11.0)269:0.0)267:1.0)263:848.0)233:1273.0,(5020:82.0,((4015:28.0,(5259:14.0,0223:15.0)277:5.0)275:0.0,(5234:2.0,(3165:0.0,5083:3.0)282:0.0)280:91.0)274:65.0)272:2047.0)232:1488.0)230:1409.0)228:716.0,((((3324:339.0,((4076:13.0,3283:82.0)291:2.0,(2275:17.0,((2052:3.0,5051:9.0)297:12.0,(2067:17.0,(5262:15.0,5218:9.0)302:2.0)300:7.0)296:152.0)294:6.0)290:77.0)288:811.0,(3066:787.0,(3068:541.0,(5247:230.0,(5142:6.0,(4084:106.0,2006:6.0)313:6.0)311:370.0)309:57.0)307:75.0)305:159.0)287:1183.0,((0319:33.0,(4289:24.0,(3123:24.0,((3001:28.0,2329:16.0)324:4.0,((0064:19.0,((2092:5.0,2216:1.0)331:21.0,(0215:1.0,(2090:0.0,0214:0.0)336:0.0)334:9.0)330:0.0)328:2.0,(4275:25.0,(2210:104.0,2244:20.0)341:0.0)339:3.0)327:0.0)323:0.0)321:1.0)319:113.0)317:1104.0,((0135:418.0,(2255:161.0,(2191:17.0,(0110:10.0,(0021:13.0,(0256:152.0,(0141:12.0,2297:23.0)357:116.0)355:27.0)353:0.0)351:0.0)349:5.0)347:1421.0)345:198.0,(3264:767.0,(4373:48.0,(5098:334.0,((4077:4.0,5288:7.0)367:24.0,(4337:34.0,((0268:4.0,(2261:1.0,5276:4.0)375:1.0)373:3.0,((5124:9.0,(((3009:2.0,3161:67.0)383:0.0,(4369:1.0,(3256:5.0,2324:2.0)388:0.0)386:1.0)382:0.0,4139:1.0)381:3.0)379:1.0,(5014:3.0,(5013:0.0,5120:0.0)394:0.0)392:5.0)378:167.0)372:0.0)370:16.0)366:231.0)364:54.0)362:95.0)360:742.0)344:708.0)316:757.0)286:2126.0,4270:2742.0)285:730.0)227:646.0,((((((4157:101.0,(4169:1.0,2014:0.0)404:1.0)402:328.0,(5027:14.0,(((5186:81.0,3032:11.0)411:1.0,(3109:1.0,(2306:1.0,3016:1.0)416:0.0)414:5.0)410:1.0,(4036:8.0,(3226:0.0,3326:0.0)421:8.0)419:7.0)409:127.0)407:258.0)401:2276.0,((3220:645.0,5157:460.0)425:3092.0,((0196:63.0,(0176:9.0,0014:12.0)431:33.0)429:122.0,((0233:563.0,(((0257:26.0,(0221:2.0,(0289:0.0,0288:0.0)443:1.0)441:257.0)439:2.0,3299:183.0)438:2.0,(2240:2.0,0049:0.0)447:27.0)437:25.0)435:1009.0,5193:381.0)434:236.0)428:2946.0)424:1106.0)400:996.0,((((((3314:1322.0,3255:133.0)456:381.0,0048:705.0)455:1414.0,(3321:1643.0,(5074:239.0,((2217:25.0,2021:28.0)465:10.0,(5189:191.0,(5021:65.0,(((5062:7.0,(4187:0.0,4032:5.0)476:97.0)474:0.0,((5274:10.0,(4294:10.0,(4087:7.0,4366:9.0)484:2.0)482:0.0)480:3.0,5171:6.0)479:1.0)473:2.0,(((3038:220.0,2063:139.0)490:333.0,3166:14.0)489:0.0,(5038:11.0,(2173:8.0,4370:11.0)496:1.0)494:2.0)488:1.0)472:5.0)470:56.0)468:683.0)464:45.0)462:1410.0)460:440.0)454:1019.0,(2307:253.0,((2233:29.0,(2323:20.0,(0113:5.0,(3200:3.0,(3293:1.0,5284:3.0)510:1.0)508:0.0)506:8.0)504:0.0)502:226.0,((2346:36.0,3235:12.0)514:4.0,(((2002:0.0,2001:2.0)519:254.0,0075:73.0)518:0.0,(2166:9.0,((4242:5.0,3122:5.0)526:29.0,((2038:3.0,(0301:4.0,4237:8.0)532:0.0)530:155.0,(0068:5.0,((2319:4.0,((2308:16.0,(4287:496.0,(2359:11.0,0194:25.0)545:1.0)543:109.0)541:0.0,(3063:0.0,3171:3.0)548:4.0)540:0.0)538:2.0,(0266:5.0,(0154:2.0,2337:6.0)553:1.0)551:63.0)537:0.0)535:2.0)529:0.0)525:0.0)523:2.0)517:3.0)513:1.0)501:335.0)499:1220.0)453:1593.0,(((5263:10.0,5066:26.0)558:47.0,3065:93.0)557:1419.0,(2227:1407.0,0023:927.0)562:1086.0)556:1708.0)452:883.0,((0163:3356.0,(3154:171.0,(5119:3.0,5217:81.0)570:149.0)568:3416.0)566:735.0,((((3050:438.0,5203:65.0)576:175.0,5012:427.0)575:2443.0,5110:2465.0)574:1276.0,((2340:6.0,0245:7.0)582:224.0,((3190:7.0,2371:12.0)586:19.0,((5173:22.0,((2288:14.0,(2060:10.0,4371:9.0)595:4.0)593:1.0,(3074:5.0,(0237:8.0,2215:0.0)600:1.0)598:14.0)592:7.0)590:10.0,(5026:40.0,(((4344:13.0,3055:11.0)607:5.0,3182:33.0)606:17.0,((2073:0.0,2074:2.0)612:18.0,((2354:16.0,(2180:13.0,(2351:0.0,2289:0.0)620:15.0)618:7.0)616:2.0,(3284:10.0,((2325:14.0,(3022:11.0,4191:11.0)628:8.0)626:2.0,(5144:26.0,((5065:5.0,(5269:5.0,3064:4.0)636:0.0)634:8.0,(4227:2.0,2105:0.0)639:6.0)633:7.0)631:0.0)625:3.0)623:6.0)615:0.0)611:5.0)605:0.0)603:7.0)589:5.0)585:279.0)581:2454.0)573:1016.0)565:706.0)451:598.0)399:532.0,(((((4134:27.0,5089:25.0)646:339.0,(5232:14.0,(4039:29.0,5015:185.0)651:166.0)649:133.0)645:493.0,5040:484.0)644:2631.0,(((5227:1174.0,((3162:6.0,(4257:0.0,5166:1.0)662:6.0)660:9.0,5159:8.0)659:1141.0)657:835.0,(((((((((((((4024:18.0,5275:12.0)678:0.0,(5003:4.0,5122:8.0)681:0.0)677:0.0,((2131:0.0,2130:0.0)685:9.0,(4012:9.0,(((((5114:8.0,5113:11.0)694:1.0,(4180:1.0,3301:1.0)697:3.0)693:0.0,2082:2.0)692:6.0,4020:15.0)691:0.0,((4226:10.0,5152:20.0)703:17.0,4109:9.0)702:2.0)690:1.0)688:0.0)684:0.0)676:0.0,((2037:9.0,(4382:5.0,3077:6.0)710:8.0)708:6.0,4320:34.0)707:0.0)675:0.0,(4028:16.0,3021:7.0)714:1.0)674:0.0,2205:15.0)673:1.0,(2315:138.0,(4083:5.0,3115:5.0)720:2.0)718:1.0)672:0.0,(2034:8.0,4393:17.0)723:2.0)671:219.0,(4002:21.0,(0160:120.0,5108:59.0)728:4.0)726:0.0)670:345.0,2027:388.0)669:118.0,(3252:28.0,0302:23.0)732:141.0)668:1328.0,4131:929.0)667:725.0,((5191:5.0,(2011:4.0,(5156:5.0,5226:42.0)741:1.0)739:0.0)737:129.0,(3233:4.0,((5079:31.0,4184:4.0)747:3.0,(4314:1.0,5165:1.0)750:1.0)746:0.0)744:411.0)736:2070.0)666:577.0)656:1668.0,(((0311:6.0,4346:7.0)755:2.0,5007:9.0)754:24.0,(3081:24.0,((5033:22.0,5129:191.0)762:69.0,4326:24.0)761:0.0)759:11.0)753:2722.0)655:1350.0)643:1000.0,((((4133:17.0,5023:18.0)769:0.0,4027:19.0)768:0.0,(0272:8.0,3205:6.0)773:10.0)767:2491.0,((5220:94.0,((4151:78.0,0307:34.0)780:605.0,4223:10.0)779:184.0)777:3451.0,(4385:189.0,(((2041:4.0,0252:40.0)788:20.0,0026:56.0)787:120.0,((4206:321.0,0061:438.0)793:0.0,2122:33.0)792:45.0)786:118.0)784:2835.0)776:1010.0)766:1096.0)642:870.0)398:434.0,((((5233:3176.0,(5080:44.0,(3097:17.0,5030:81.0)803:31.0)801:3081.0)799:1081.0,(((0267:32.0,2280:109.0)808:55.0,(2146:3.0,0291:3.0)811:72.0)807:165.0,3247:179.0)806:1927.0)798:1221.0,(((0165:879.0,(((2298:7.0,2134:7.0)821:5.0,2054:45.0)820:128.0,(0317:4.0,0322:4.0)825:330.0)819:602.0)817:1419.0,((4399:409.0,0050:423.0)829:2190.0,(5222:181.0,2316:328.0)832:1464.0)828:1454.0)816:1456.0,((((2051:10.0,4071:17.0)838:1317.0,(2235:1758.0,(2149:686.0,(0173:1039.0,(0095:2.0,0262:1.0)847:1027.0)845:1440.0)843:680.0)841:924.0)837:1676.0,0175:2477.0)836:775.0,((5136:2609.0,2258:2017.0)852:817.0,(0279:8.0,0308:32.0)855:2000.0)851:995.0)835:882.0)815:957.0)797:598.0,((((0080:2696.0,((4292:0.0,4372:0.0)863:2111.0,(2024:7.0,0274:10.0)866:1757.0)862:1817.0)860:901.0,(5121:2554.0,((3059:1117.0,4155:1079.0)872:1478.0,((3093:16.0,(2196:24.0,((4168:3.0,2254:2.0)881:1.0,4252:12.0)880:4.0)878:1.0)876:28.0,5248:32.0)875:1889.0)871:1953.0)869:849.0)859:536.0,(3003:3874.0,3138:3365.0)886:818.0)858:697.0,(2305:3134.0,(4054:2112.0,(0071:754.0,((2279:523.0,(((((0320:14.0,0321:209.0)18:56.0,((0159:1.0,2250:3.0)22:5.0,0290:125.0)21:6.0)17:352.0,0276:522.0)16:15.0,(0015:168.0,(0220:107.0,(2003:11.0,(0082:9.0,(2247:12.0,0152:6.0)35:0.0)33:4.0)31:11.0)29:156.0)27:21.0)15:43.0,((0254:30.0,(0140:190.0,4049:100.0)41:0.0)39:4.0,(3192:26.0,((0314:21.0,((0205:0.0,0038:4.0)50:66.0,(0093:7.0,(0285:5.0,((4091:5.0,((3225:6.0,2055:3.0)61:1.0,5072:22.0)60:0.0)58:1.0,2058:6.0)57:1.0)55:0.0)53:4.0)49:0.0)47:0.0,(2153:36.0,2225:3.0)66:5.0)46:0.0)44:2.0)38:24.0)14:253.0)12:214.0,(3026:592.0,(0136:341.0,((2018:14.0,2243:19.0)6:71.0,(0172:24.0,((0273:125.0,(0138:535.0,(0324:30.0,3031:23.0)898:148.0)896:24.0)894:1.0,(2237:12.0,2050:52.0):3.0)2:0.0)3:18.0)5:229.0)9:806.0)10:391.0)11:456.0)69:2468.0)70:1463.0)71:1220.0)72:372.0)73:316.0)74:515.0)75:763.0)76;',
function () {
  tree.backColour = true;
  // tree.setNodeSize(10);
  // tree.textSize = 20;

  // tree.branches.A.setDisplay({
  //   leafStyle: {
  //     fillStyle: 'lightgray',
  //   },
  // });
  // tree.branches.B.setDisplay({
  //   colour: 'red',
  //   shape: 'triangle',
  //   leafStyle: {
  //     fillStyle: 'pink',
  //   },
  // });
  // tree.branches.C.setDisplay({
  //   colour: 'green',
  //   shape: 'star',
  //   leafStyle: {
  //     fillStyle: 'lightgreen',
  //   },
  //   // labelStyle: {
  //   //   colour: 'red',
  //   // },
  // });
  // tree.branches.D.setDisplay({
  //   colour: 'blue',
  //   shape: 'square',
  //   leafStyle: {
  //     fillStyle: 'lightblue',
  //   },
  // });

  // tree.updateLeaves(tree.findLeaves('(A|B)'), 'highlighted', true);

  // tree.branches.A.radius = 2;
  // tree.branches.B.radius = 2;

  // tree.root.cascadeFlag('interactive', false);
  // tree.updateLeaves(tree.findLeaves('C'), 'interactive', true);

  // const branch = tree.branches.B;
  // branch.label = 'Bravo';
  // branch.labelStyle = {
  //   textSize: 50,
  //   font: 'ubuntu',
  //   format: 'italic',
  //   colour: 'purple',
  // };
  // branch.radius = 2;

  // tree.padding = -25;
  var canvas = tree.canvas.canvas;
  canvas.style.border = '3px solid';
  canvas.style.boxSizing = 'border-box';
  // tree.branchScalar = 0.01;
  tree.draw();
  tree.fitInPanel();
  tree.draw();

  scaleRange.value = 1;
});

window.phylocanvas = tree;

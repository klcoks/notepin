# 馃搶 鏅哄瓨 (NotePin) - AI 鏅鸿兘缃戦〉鏀惰棌鎻掍欢

> 閫変腑缃戦〉鍐呭 鈫?AI 鑷姩鎬荤粨銆佹墦鏍囩銆佸垎绫?鈫?涓€閿瓨鍒?Notion

璁╂敹钘忎笉鍐嶆槸鍚冪伆銆?
## 鉁?鏍稿績鍔熻兘

- 馃搫 **鏁撮〉鏀惰棌**锛氱偣鍑绘彃浠跺浘鏍囨垨鎸夊揩鎹烽敭 `Ctrl+Shift+S`
- 鉁傦笍 **閫夋鏀惰棌**锛氶€変腑鏂囧瓧 鈫?鍙抽敭鑿滃崟
- 馃 **AI 鏅鸿兘澶勭悊**锛氳嚜鍔ㄧ敓鎴?3 鍙ユ憳瑕併€佹彁鍙?3-5 涓爣绛俱€佽嚜鍔ㄥ垎绫?- 馃摎 **Notion 鍚屾**锛氱洿鎺ュ啓鍏ヤ綘鐨?Notion 鏁版嵁搴?- 馃晲 **鏈湴鍘嗗彶**锛氫繚鐣欐渶杩?100 鏉℃敹钘忚褰?
## 馃殌 蹇€熷紑濮?
### 绗竴姝ワ細涓嬭浇鏈」鐩?纭繚浣犲凡缁忔妸鏁翠釜鏂囦欢澶规斁鍒版湰鍦帮紝渚嬪 `i:\DEV2\chajian`銆?
### 绗簩姝ワ細鍦?Chrome 鍔犺浇鎻掍欢
1. 鎵撳紑 Chrome锛屽湴鍧€鏍忚緭鍏?`chrome://extensions/`
2. 鍙充笂瑙掓墦寮€銆?*寮€鍙戣€呮ā寮?*銆?3. 鐐瑰嚮銆?*鍔犺浇宸茶В鍘嬬殑鎵╁睍绋嬪簭**銆?4. 閫夋嫨鏈」鐩牴鐩綍锛堝寘鍚?`manifest.json` 鐨勯偅涓枃浠跺す锛?
### 绗笁姝ワ細鐢宠 DeepSeek API Key
1. 璁块棶 [DeepSeek 寮€鏀惧钩鍙癩(https://platform.deepseek.com/api_keys)
2. 娉ㄥ唽 鈫?瀹炲悕 鈫?鍒涘缓 API Key
3. 澶嶅埗 Key锛堜互 `sk-` 寮€澶达級锛屼繚瀛樺ソ

> 馃挵 浠锋牸鍙傝€冿細1000 娆¤皟鐢ㄧ害 楼0.5锛屾柊鐢ㄦ埛閫佷唬閲戝埜澶熺敤鍗婂勾

### 绗洓姝ワ細閰嶇疆 Notion

#### 4.1 鍒涘缓 Notion Integration
1. 璁块棶 https://www.notion.so/my-integrations
2. 鐐瑰嚮銆?*+ New integration**銆?3. 杈撳叆鍚嶅瓧锛堟瘮濡?`NotePin`锛夆啋 閫変綘鐨?Workspace 鈫?鍒涘缓
4. 澶嶅埗 **Internal Integration Token**锛堜互 `secret_` 鎴?`ntn_` 寮€澶达級

#### 4.2 鍒涘缓 Notion 鏁版嵁搴?鍦?Notion 浠绘剰椤甸潰閲岃緭鍏?`/database` 鈫?閫夈€?*Database - Full page**銆嶏紝鐒跺悗**纭繚瀛楁鍚嶅畬鍏ㄥ拰涓嬮潰涓€鑷?*锛?
| 瀛楁鍚?| 绫诲瀷 |
|--------|------|
| 鏍囬 | Title |
| 閾炬帴 | URL |
| 鎽樿 | Text |
| 鏍囩 | Multi-select |
| 鍒嗙被 | Select |
| 鏀惰棌鏃堕棿 | Date |

#### 4.3 鎶?Integration 鍏宠仈鍒版暟鎹簱
- 鎵撳紑浣犲垱寤虹殑鏁版嵁搴撻〉闈?鈫?鍙充笂瑙掋€?*鈰?*銆嶁啋 **Connections** 鈫?**+ Add connections** 鈫?閫変綘鍒氬垱寤虹殑 `NotePin`

#### 4.4 澶嶅埗鏁版嵁搴?ID
- 鐪嬫祻瑙堝櫒鍦板潃鏍忥細`https://www.notion.so/yourname/abc123def4567890...?v=xyz`
- `abc123def4567890...`锛?2 浣嶅瓧绗︼級灏辨槸鏁版嵁搴?ID

### 绗簲姝ワ細濉叆鎻掍欢璁剧疆
1. 鐐瑰嚮 Chrome 宸ュ叿鏍忛噷鐨勬櫤瀛樺浘鏍?鈫?銆屸殭锔忋€?杩涘叆璁剧疆
2. 濉叆 **DeepSeek Key** 鈫?鐐广€屾祴璇曘€嶁啋 鐪嬪埌 鉁?3. 濉叆 **Notion Token** + **鏁版嵁搴?ID** 鈫?鐐广€屾祴璇曘€嶁啋 鐪嬪埌 鉁?4. 鐐广€屼繚瀛樿缃€?
鉁?瀹屾垚锛佸紑濮嬫敹钘忓惂銆?
## 馃摉 浣跨敤鏂规硶

| 鎿嶄綔 | 璇存槑 |
|------|------|
| 鐐瑰嚮鎻掍欢鍥炬爣 鈫?鏀惰棌鏁翠釜椤甸潰 | 鑷姩鎶撳彇椤甸潰姝ｆ枃锛孉I 澶勭悊鍚庡瓨鍒?Notion |
| 閫変腑鏂囧瓧 鈫?鍙抽敭 鈫?鏅哄瓨锛氭妸閫変腑鍐呭瀛樺埌 Notion | 鍙繚瀛樹綘閫変腑鐨勯儴鍒?|
| 蹇嵎閿?`Ctrl+Shift+S` | 涓€閿敹钘忓綋鍓嶆暣椤碉紙Mac: `Cmd+Shift+S`锛?|

## 馃梻锔?椤圭洰缁撴瀯

```
chajian/
鈹溾攢鈹€ manifest.json              # 鎻掍欢閰嶇疆
鈹溾攢鈹€ background/
鈹?  鈹斺攢鈹€ service-worker.js      # 鍚庡彴閫昏緫锛堝彸閿彍鍗曘€佷繚瀛樻祦绋嬶級
鈹溾攢鈹€ content/
鈹?  鈹斺攢鈹€ content.js             # 椤甸潰娉ㄥ叆鑴氭湰
鈹溾攢鈹€ popup/                     # 鐐瑰嚮鍥炬爣鐨勫脊绐?鈹?  鈹溾攢鈹€ popup.html
鈹?  鈹溾攢鈹€ popup.css
鈹?  鈹斺攢鈹€ popup.js
鈹溾攢鈹€ options/                   # 璁剧疆椤?鈹?  鈹溾攢鈹€ options.html
鈹?  鈹溾攢鈹€ options.css
鈹?  鈹斺攢鈹€ options.js
鈹溾攢鈹€ lib/                       # 宸ュ叿搴?鈹?  鈹溾攢鈹€ ai.js                  # DeepSeek 灏佽
鈹?  鈹溾攢鈹€ notion.js              # Notion API 灏佽
鈹?  鈹斺攢鈹€ storage.js             # 鏈湴瀛樺偍灏佽
鈹溾攢鈹€ icons/                     # 鍥炬爣
鈹?  鈹溾攢鈹€ icon16.png
鈹?  鈹溾攢鈹€ icon48.png
鈹?  鈹斺攢鈹€ icon128.png
鈹斺攢鈹€ README.md
```

## 馃洜锔?淇敼涓庤皟璇?
### 淇敼鍚庡浣曢噸杞斤紵
1. 鏀瑰畬浠ｇ爜 鈫?杩涘叆 `chrome://extensions/`
2. 鎵惧埌銆屾櫤瀛樸€嶁啋 鐐瑰嚮 **馃攧 鍒锋柊** 鎸夐挳
3. 閲嶆柊鎵撳紑缃戦〉娴嬭瘯

### 鏌ョ湅鏃ュ織
- **Popup 鏃ュ織**锛氬彸閿彃浠跺浘鏍?鈫?銆屾鏌ュ脊鍑哄唴瀹广€?- **Background 鏃ュ織**锛歚chrome://extensions/` 鈫?鏅哄瓨 鈫?銆屾煡鐪嬭鍥撅細Service Worker銆?- **椤甸潰娉ㄥ叆鏃ュ織**锛氬湪缃戦〉鎸?F12

## 馃殺 涓婃灦 Chrome 鍟嗗簵

鍑嗗濂藉悗锛?
1. 鍒犻櫎椤圭洰閲屼笉蹇呰鐨勬枃浠讹紙`README.md` 鍙互淇濈暀锛?2. 鎶婃暣涓枃浠跺す鎵撳寘鎴?`zip`
3. 娉ㄥ唽 [Chrome Web Store 寮€鍙戣€呰处鍙穄(https://chrome.google.com/webstore/devconsole)锛堜竴娆℃€?$5锛?4. 鍒涘缓鏂伴」鐩?鈫?涓婁紶 zip 鈫?濉啓鍟嗗簵淇℃伅 鈫?鎻愪氦瀹℃牳
5. 1-3 澶╅€氳繃鍚庡嵆鍙笂鏋?
## 馃挵 鍟嗕笟鍖栧缓璁紙V2 璺嚎鍥撅級

- **Free 鐗?*锛氭瘡鏈?30 娆℃敹钘忥紙宸插疄鐜帮細鏈湴鍘嗗彶 100 鏉?+ 鏃犻檺鏀惰棌锛?- **Pro 鐗?楼9.9/鏈?*锛?  - 鑷畾涔?Notion 妯℃澘瀛楁
  - 澶氱瑪璁板伐鍏锋敮鎸侊紙椋炰功銆佽闆€锛?  - 鍏ㄦ枃鎼滅储鍘嗗彶
  - 鑷畾涔?AI Prompt
- **Team 鐗?楼39/鏈?鍥㈤槦**锛氬叡浜暟鎹簱銆佸崗鍚屾爣绛?
瀹炵幇璁㈤槄鏍￠獙锛?- 鐢?[Lemon Squeezy](https://www.lemonsqueezy.com/) 鏀舵锛堟敮鎸佷腑鍥斤紝鑷姩绋庡姟锛?- 鑷缓涓€涓畝鍗曠殑 License 鏍￠獙鍚庣锛堢敤 Cloudflare Workers 鍗冲彲锛?
## 馃摑 License

MIT License - 浣犲彲浠ヨ嚜鐢变慨鏀广€佸晢鐢ㄣ€佷笂鏋躲€?

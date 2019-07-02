---
layout: post
title: font-family
date: 2019-06-25 00:00:00 +0300
description: 모바일 디바이스 font-family # Add post description (optional)
img: # Add image post (optional)
tags: [css, font-family] # add tag
---



## 배경
***

모바일 OS 체계에 따라 디폴트로 랜더링하는 폰트가 달라 디바이스마다 산출물이 다르게 구현되고 있다.
디자인, 퍼블리싱 작업을 할 때 기준 폰트, 기준 디바이스를 약속하여 디자인 산출물과 퍼블리싱 산출물의 정합성을 높여 산출물 퀄리티를 높이고자 한다.

<br><br><br>
## OS체계에 따른 기본 font

||안드로이드(5이상)|IOS|윈도우(ie)|
|:-----:|:-----:|:-----:|:-----:|
|국문|본고딕 (Noto Sans CJK)|Apple SD Gothic Neo|Malgun Gothic|
|영문|Roboto|San Francisco|Segoe UI|
|숫자|Roboto|San Francisco||


* OS X 라이언 (10.7) 
* OS X 마운틴 라이언 (10.8) 
* OS X 마운틴 매버릭스 (10.9) 
* OS X 마운틴 요세미티 (10.10) 
* OS X 마운틴 엘카피탠 (10.11) 
* OS X 마운틴 시에라 (10.12) 


<br><br><br>
### font-family 선언

**포털에서 사용하고 있는 font-family 선언**
```
/* PC */
body,code { font-family:AppleSDGothicNeo-Regular,'Malgun Gothic','맑은 고딕',dotum,'돋움',sans-serif; } /* daum */
body,code { font-family:Dotum,'돋움',Helvetica,"Apple SD Gothic Neo",sans-serif; } /* naver */

/* mobile */
body,code { font-family:HelveticaNeue-Light,AppleSDGothicNeo-Light,'Malgun Gothic','맑은 고딕',sans-serif; } /* daum */
body,code { font-family:HelveticaNeue-Light,AppleSDGothicNeo-Light,sans-serif; } /* naver */
```

1. AppleSDGothicNeo 과 "Apple SD Gothic Neo"
    폰트이름에 띄어쓰기가 있다면 반드시 홑따옴표나 쌍따옴표로 묶어서 준다.
    
1. AppleSDGothicNeo는 기존의 AppleGothic을 대신하여 OS X 10.8 (마우틴 라이언)부터 사용되고 있다.
    * OS X 라이언 (10.7) : AppleGothic
    * OS X 마운틴 라이언 (10.8) : AppleSDGothicNeo
    
1. AppleSDGothicNeo는 9가지 계열 서체를 제공하고 있다. (아래로 갈 수록 굵다)
    * Thin
    * UltraLight
    * Light
    * Regular
    * Medium
    * SemiBold
    * Bold
    * ExtraBold
    * Heavy

1. OS X 10.11(엘카피탠) 부터 Helvetica Neue를 대체하여 San Francisco가 사용되게 되었다. (영문, 숫자)
    Helvetica Neue은 가독성이 좋지 못하고, 디자인에만 신경쓴다는 비판을 많이 받았고 그로인해 San Francisco로의 전환을 불려왔다.
    (근데 왜 포털의 모바일에서는 font-family를 HelveticaNeue-Light를 맨처음 선언하여 HelveticaNeue으로 영문을 나타내려는 걸까? 디자이너들이 디자인을 포기하지 못했는지...)
    



<br>

```
body,code { font-family: "웹폰트", "Apple SD Gothic Neo", "맑은 고딕", "malgun gothic", "돋움", "dotum", sans-serif; } /* 웹폰트 사용 */
```




    



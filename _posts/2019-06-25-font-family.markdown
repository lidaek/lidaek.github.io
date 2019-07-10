---
layout: post
title: font-family
date: 2019-06-25 00:00:00 +0300
description: font-family # Add post description (optional)
img: # Add image post (optional)
tags: [css, font-family] # add tag
---



## 배경
***

OS 체계에 따라 디폴트로 랜더링하는 폰트가 달라 디바이스마다 산출물이 다르게 구현되고 있다.
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
    
1. 웹 브라우저마다 참조하는 이름이 다르기 때문에 font명은 영문과 한글을 다 적어주는것이 좋다. 예: 'Malgun Gothic','맑은 고딕'
    
1. AppleSDGothicNeo는 기존의 AppleGothic을 대신하여 OS X 10.8 (마우틴 라이언)부터 사용되고 있다.
    * OS X 라이언 (10.7) : AppleGothic
    * OS X 마운틴 라이언 (10.8) : AppleSDGothicNeo
    
1. AppleSDGothicNeo는 9가지 계열 서체를 제공하고 있다. (아래로 갈수록 굵다)
    * Thin
    * UltraLight
    * Light
    * Regular - 기본 굵기
    * Medium
    * SemiBold
    * Bold
    * ExtraBold
    * Heavy
    
    ![AppleSDGothicNeo]({{site.baseurl}}/assets/img/applesdgothicneo.png)

1. OS X 10.11(엘카피탠) 부터 Helvetica Neue를 대체하여 San Francisco가 사용되게 되었다. (영문, 숫자)
    Helvetica Neue은 가독성(작은크기의 텍스트)이 좋지 못하고, 디자인에만 신경쓴다는 비판을 많이 받았고 그로인해 San Francisco로의 전환을 불려왔다.
    [애플 San Francisco](https://blog.naver.com/vinylx/220500281398)
    
    (근데 왜 포털의 모바일에서는 font-family를 HelveticaNeue-Light를 맨처음 선언하여 HelveticaNeue으로 영문을 나타내려는 걸까? 디자이너들이 디자인을 포기하지 못했는지... 누가 알려죠...)
    

<br><br><br>

***
안드로이드의 기본폰트는 본고딕(noto sans)이다. 삼성폰은 삼성폰트가 랜더링 된다. (햐... 신이시여)

이 말은 삼성폰이 기준폰이 된다면 디자이너는 삼성폰트로 디자인을 해야하고, 퍼블리셔는 삼성폰으로 퍼블리싱 작업물을 봐야 디자인 정합성을 정확하게 맞출 수 있다는 말이다.

LG폰도 LG폰트가 나왔다는 말을 전해 들었다. 예전 LG폰은 정말 noto sans가 랜더링되어서 기뻤었는데.

이렇게까지 해야하나 싶지만 모바일에서 폰트와 기준 디바이스 설정은 너무나 중요하다. **모든 디바이스를 만족할 수 없기 때문에 기준 디바이스, 소프트웨어 버전은 반드시 설정**해야한다.

>폰마다 디자인이 다르게 적용된 것 같아요. <br><br>넵 저희 기준 디바이스는 XX입니다. 여기에 최적화 되어있습니다. 라고 말을 할 수 있기때문에!!

초반 프로젝트 진행시 이런 설정에 대한 약속들은 정말 중요하다. 중간에 가서 그 약속들이 수정이 될 수도 있으나(IT에서는 절대적인게 없으니...) 중간에 바뀔 수도 있다고 초반 설정을 하지 않는 멍청이는 되지 말자.


    
    



<br><br><br> 
위의 조사를 통해 나는 font-family를 아래와 같이 정의 하기로 했다.

웹폰트를 사용한다면 맨앞에 웹폰트를 넣을것이며, 사용하지 않는다면 생략한다.

ios에서 영문을 HelveticaNeue으로 쓰길 원한다면(디자인에서 요청이 온다면), Apple SD Gothic Neo 앞에 HelveticaNeue를 넣어서 쓰겠다.

```
body,code { font-family: "웹폰트", HelveticaNeue, "Apple SD Gothic Neo", "맑은 고딕", "malgun gothic", "돋움", "dotum", sans-serif; }
```





<br><br><br>    
### 참조url

[웹폰트파헤치기](http://www.beautifulcss.com/archives/431)



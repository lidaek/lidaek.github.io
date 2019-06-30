---
layout: post
title: CSS3 grid
date: 2019-06-28 00:00:00 +0300
description: CSS3 grid flex # Add post description (optional)
img: software.jpg # Add image post (optional)
tags: [css3, grid, flex] # add tag
---



## flex vs grid
***

flex보다 확장성이 있는것이 grid이지만 grid가 flex의 대체자로의 개념으로 쓰이면 안된다.
서로 다른 목적과 강점을 지니고 있다.


| 구분 | flex | grid | 비고 |
|---|--------|--------|--------|
| layout | **1차원 레이아웃** <br> flex-direction:row or flex-direction:column <br> 행, 열 둘 중 하나를 골라서 사용 | **2차원 레이아웃**<br> grid-column, grid-row 함께 사용하여 행, 열 모두를 표현 가능 | 행과 열 중 하나를 사용한다면 flex,<br>행과 열 모두를 사용한다면 grid를 사용하는것이 좋다 |
| layout 너비 | 내용(양)에 따라 레이아웃이 결정된다. <br> 1. **자식들 요소의 내용양**에 의해서 결정된다 <br>2. 자식요소에 너비를 지정하여 널뛰기 현상 해결 가능하다.<br> .child{width:200px} .chile{flex:1} | 컨테이너가 레이아웃을 지정한다.<br>1. **부모**에서 너비가 지정된다.<br>2. 고정된 너비가 지정되어 널뛰기 현상이 일어나지 않는다. | [널뛰기비교영상](https://www.youtube.com/watch?v=vPryjyFP5FM&feature=youtu.be) |
|사용|컴포넌트단위로 사용|레이아웃에 사용||

<br><br><br>

## grid 속성
***
![grid column 과 rowgrid.png]({{site.baseurl}}/assets/img/grid.png)

위의 예시 이미지로 설명합니다.

* grid를 사용하게 되면 관리자 모드에서 점선(----)으로 grid가 나뉘어져 있는것을 확인 할 수 있다.
* 그리드의 항목 배치는 트랙이 아니라 **그리드 선(grid lines)**을 기반으로 한다.
    * column : 1~5
    * row : 1~3
    
    만약 트랙단위라고 했다면 column은 1~4(4개의 트랙), row는 1~2(2개의 트랙)로 표현되었을 것이다.
    
* 마지막 줄은 줄 수에 관계없이 -1이다.
    * column의 마지막 줄 수는 5이지만 -1로 표현할 수 있다.
    * row의 마지막 줄 수는 3이지만 -1로 표현할 수 있다.

* fr(fractional: 분수의, 단편적인, 분할적인) 단위를 사용한다.
    * 4fr =  25% 25% 25% 25%
    * 2fr 1fr 1fr = 50% 25% 25 %
    
    fr은 ie10에서 지원되지 않으므로 ie10작업시에는 %로 변경해서 사용해야한다.
    
* span  
    
    
### column/row를 표현하는 방법
#### 부모에게 지정하는 방법
```    
.parents { grid-template:rows값 / columns값 ; } 
.parents { grid-template-columns:값; }
.parents { grid-template-rows:값; }

/* 축약형*/
.parents { grid-template-areas:"" "" ""; }

/* auto */
.parents { grid-auto-columns:값; }
.parents { grid-auto-rows:값; }
```


| 값 | 해석 |
|--------|--------|
|25% 25% 25% 25% = <br>1fr 1fr 1fr 1fr = <br>repeat(4, 1fr)|4개의 column/row을 가지며, 각 column/row은 같은 비율이다.<br><br>비율을 표현하는 방법이 %뿐만 아니라 fr단위를 사용할 수 있고, 반복되는 fr단위는 repeat를 이용할 수 있다.|

#### 자식에게 지정하는 방법
```
.child { grid-column:start grid line값/end grid line값; }
.child { grid-column-start:line값; }
.child { grid-column-end:line값; }


.child { grid-row:start grid lind 값/end grid line값; }
.child { grid-row-start:값; }
.child { grid-row-end:값; }

/* 축약형 */
.child { grid-area :row-start grid line / column-start grid line / row-end grid line / column-end grid line; }
```

| 값 | 해석 |
|--------|--------|
|1 / 3;|start grid line / end grid line|
|2 / -1;|2번째 줄 부터 마지막 줄까지 너비 지정되어 있음을 알 수 있다.|
|1 / span 2; = <br>1 / 3|항목이 둘 이상의 열이나 행에 걸쳐 있는 경우 끝 줄을 지정하지 않고 span 키워드를 이용하면 된다.<br>span 1, span 2, span 3.... 은 각각 1, 2, 3에 걸쳐 있음을 의미 한다.|
|span 2 / 5; = <br>3 / 5|끝 줄을 제공하고 시작줄에 span을 사용하면 스팬이 반대로 작동한다. 즉 마지막 줄 부터 시작하여 2에 걸쳐 있다.|
|1/-1|-1은 마지막 줄이므로 행, 열의 갯수가 모를경우 100%를 차지 한다면 1(start) 와 -1(end)를 지정하여 표현할 수 있다.|
   

<br><br><br>

### 작업시 유용한 정보
1. grid-columns:25% 25% 25% 25% = grid-columns:1fr 1fr 1fr 1fr = grid-columns:repeat(4, 1fr)
    * flex로 표현하려고 하면 flex속성을 가진 부모에 flex-direction:row; 라는 속성을 flex부모의 4개의 child에 flex:1; 속성을 줘야하지만 gird는 부모에게만 정의하면 된다. - 레이아웃에 강점
    * ie10에서는 fr속성이 안먹히므로 grid-columns:repeat(4, 1fr)를 반드시 -ms-grid-columns:25% 25% 25% 25%로 변경해서 사용한다.(반드시!!)

1. grid-column:2/-1  grid-row:1/-1 
    * -1은 마지막 줄이므로 행, 열의 갯수가 모를경우 100%를 차지 한다면 1(start) 와 -1(end)를 지정하여 표현할 수 있다.
    * grid는 바둑판 처럼 시작점과 마지막점을 나열하면 위치를 잡을수 있다. 하지만 모든요소에 위치점을 잡아두면 그 중간에 다른 요소들이 추가될때마다 그 아래에 위치하는 요소들의 위치값을 모두 다시 잡아줘햐한다는 단점이 있다.
    * footer와 같이 항상 하단에 위치하는 요소들은 -1을 이용하여 위치를 잡는다면 중간에 요소들이 새롭게 추가되어도 위치점을 다시 잡아 줄 필요가 없다. 맨 하단에 위치하는것은 항상 -1이니깐.
    
1. caniuse를 맹신하지 말아라
    * [caniuse=grid](https://caniuse.com/#search=grid)
    * caniuse에서는 안드로이드 6~부터, ie10(벤더프리픽스 사용시)부터 사용가능하다고 되어있지만 실제로 사용하다보면 기기의 브라우저의 영향을 많이 탄다
    * 안드로이드 6버전의 lg폰 기본 브라우저에서는 grid가 먹히지 않는다.
    
1. 레이아웃을 위해서는 grid사용은 편리해 보이나, 최신브라우저만 지원한다는 단점을 지니고 있고, flex와 달리 이슈가 발생했을시 그 이슈를 하위버전까지 대응할 수 있는 방법들이 많이 부족해보인다. 도전도 좋지만 현명한 판단을 하길 바란다.


### grid 학습 url
1. [learncssgrid](https://learncssgrid.com/)
1. [vobour css grid](https://www.vobour.com/css-%EA%B7%B8%EB%A6%AC%EB%93%9C-%EB%A0%88%EC%9D%B4%EC%95%84%EC%9B%83-%EA%B5%90%EC%B0%A8-%EC%84%B9%EC%85%98-css-grid-layout-%E2%80%94)
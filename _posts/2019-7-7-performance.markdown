---
layout: post
title: css 성능 향상
date: 2019-07-07 00:00:00 +0300
description: CSS 성능 # Add post description (optional)
img:  # Add image post (optional)
tags: [css, performance] # add tag
---

**HTTP Reuqest 최소화**와 **렌더링 성능 향상**을 통하여 css 성능을 높일 수 있다.


## HTTP Reuqest 최소화

### 외부 파일(external) 방식 사용
inline이나 internal방식으로 사용하게 되면 매번 HTML을 요청할 때마다 다운되어 HTTP Request를 증가시키므로 외부 파일을 링크하는 external 방식을 사용한다.
``` 
// inline
<div style="...">...</div> 
// internal(임베디드)
<style>...<style>  
// external
<link rel="stylesheet" href="">   
```
external 방식에서도 @import 대신에 link를 사용한다.
여러 개의 import 파일이 있을 시 ie에서 다운로드 순서가 뒤섞이고, 스크립트 파일보다 늦게 다운로드되어 원하는 컨텐츠를 확인하기 힘들다.

### css파일을 하나로 통합한다.

1개의 CSS File = 1개의 HTTP Reuqest가 발생하므로 하나로 합쳐 HTTP request를 줄일 수 있다.

### css image sprite 기법을 활용한다.
이미지의 개수만큼 HTTP Reuqest를 요청하기 때문에 여러개의 이미지를 하나의 이미지에 머지해두고 HTTP Reuqest가 한번만 일어나게 한다.

> **image sprite??**<br>
여러개의 이미지를 하나로 결합하고 CSS의 background-position을 설정하여 필요한 부분의 이미지만 보여주는 기술이다.


<br><br><br>
## 렌더링 성능 향상

### css파일은 상단에 선언한다.
js는 로딩이 완료되기까지 다음 코드를 로딩하지 않기 때문에 대기시간이 발생하나,
css는 여러 개를 동시 로딩할 수 있고 모두 읽어지지 않더라도 js등의 다른 파일을 읽을 수 있기 때문에 속도 저하를 막을 수 있다.
DOM트리와 CSSOM트리가 합쳐져 렌더트리를 형성하므로, CSS가 DOM트리 형성에 영향을 주지 않더라도 빠른 랜더링을 위하여 css파일을 상단에 배치하는게 좋다.

(js 파일을 만나면 브라우저는 dom생성을 중지하고 js파일이 다 읽혀지기까지 기다리기 때문에 dom생성을 빨리 하기 위해 js파일은 html 하단에 넣어두는것이 좋습니다.)

### css selector 최적화

![스타일 엔진이 css 선택자를 읽는 순서]({{site.baseurl}}/assets/img/selector.png)

스타일엔진은 ①(이하 키선택자로 지칭)로 부터 시작하여 왼쪽으로 이동하면 엘리먼트 규칙이 적합한지를 확인하고, 확인할 규칙이 없거나 잘못된 규칙이 튀어 나올때까지 계속 확인한다.
키선택자가 **특별**할수록 스타일엔진이 고려해야할 규칙의 수가 줄어들어 CSS 성능이 향상된다.

1. 태그명으로 selector를 지정하지 않는다.
    태그명으로 지정시에 그 태그명을 모두 찾기 때문에 속도가 저하된다.
    
    ``` 
    .selector p {} 
    .selector .txt {} //good
    ```
    
2. 태그와 class조합, 태그와 id조합을 피한다.<br>
    불필요한 태그를 조합하여 파일용량이 증가됨을 막을수 있고, 스타일엔진이 태그까지 대응할 필요가 없어진다.  
    
    ``` 
    .selector strong.title {} 
    .selector .title {} //good
    ```
    
3. 전체선택자와 속성선택자의 사용을 피한다.<br>
    전체 선택자를 사용하면 최초 문서내의 모든 요소에 대응시키므로 속도가 저하된다.<br>
    속성 선택자를 사용하면 최초 문서내의 모든 태그에 해당 속성값이 있는지 확인하므로 속도가 저하된다.
    
    ``` 
    .selector * {} //bad
    [type="radio"] {} //bad
    ```
    
4. 최대 3개 이상의 자손 선택자는 피한다.<br>
    무리한 자손선택자의 나열은 규칙을 증가시키고, 컴포넌트 타입이 늘어날때마다 그 스타일을 적용하기 위해(css우선순위를 높여야한다.) 계속 반복되어 사용되므로 파일을 더욱 무겁게 한다.
    
     ``` 
    .selector .child1 .child2 .child3 {} 
    .selector .child1 .child3 {} // better
    ```
    
5. id선택자보다 class 선택자를 사용한다.<br>
    id선택자를 이용한 스타일은 한 요소에만 사용되게 되고, 스타일 규칙의 재사용을 불가능하게 만들어 css파일을 크게 만든다.
    
    
### css 파일의 용량을 줄인다.

1. 압축(minify)하여 css 용량을 줄인다.
2. 빈 공백을 최소화한다.
3. 모든 css선언의 마지막 세미클론은 생략한다.



    
    
    
    
















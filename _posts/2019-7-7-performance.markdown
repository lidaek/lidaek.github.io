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

### css 규칙















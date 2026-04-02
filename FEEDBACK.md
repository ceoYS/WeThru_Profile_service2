# Evaluation Report

> 평가일: 2026-04-02  
> 평가 기준: PLAN.md Acceptance Criteria + frontend-design SKILL.md 4기준  
> 평가자: Evaluator Agent (코드 수정 없음, 오직 평가만)  
> Round: 3 (이전 31/40 → 현재)

---

## 총점: 35/40

---

### Round 2 → Round 3 개선 요약

| Round 2 지적사항 | 반영 여부 | 비고 |
|---|---|---|
| Showcase 실제 납품물 iframe 삽입 | **✓ 완전 반영** | 3개 슬라이드 모두 demo-profile-0{1,2,3}.html iframe으로 교체 |
| Hero mockup iframe 교체 | **△ 부분 반영** | Laptop screen에 iframe 삽입 완료 / Mobile은 CSS skeleton 유지 |
| Problem 섹션 CSS skeleton → iframe | **✓ 완전 반영** | `problem__card-mock--profile`에 demo-profile-01 iframe 삽입 |
| WhyNow `data-suffix="만+"` 추가 | **✓ 완전 반영** | 1,100만+ / 194만+ / 67% 모두 올바르게 표시 |
| Testimonials dot 수(3→4) 수정 | **✓ 완전 반영** | data-dot="0"~"3" 4개 dot 완성 |

---

### 1. Design Quality (9/10)

_이전 라운드: 7/10_

- **개선된 점 (+2점):**
  - **Showcase 3슬라이드 전체 iframe 교체** (index.html:242~254): CSS illustration → 실제 HTML 프로필 페이지. 잠재 고객이 브라우저 mockup 안에서 납품물 스타일·레이아웃·컬러 시스템을 직접 확인 가능. `showcase__screen`이 `aspect-ratio: 16/10 + overflow:hidden`으로 올바르게 크롭됨.
    - demo-profile-01: Dark Premium 다크 골드 임원 스타일 ✓
    - demo-profile-02: Career Story 라이트 네이비 그린 스타트업 스타일 ✓
    - demo-profile-03: Minimal Card 화이트 센터드 디렉터 스타일 ✓
  - **Hero laptop mockup iframe** (index.html:80): `mockup-laptop__screen`(`aspect-ratio: 16/10`)에 demo-profile-01 iframe 삽입. 랜딩 진입 첫 화면에서 실제 납품물 스타일이 노출됨. `pointer-events: none`으로 클릭 방해 없음.
  - **Problem 섹션 iframe** (index.html:160): "종이 명함 vs 비즈니스 프로필" 비교에서 오른쪽 컬럼에 실제 프로필 iframe 삽입. `padding:0; overflow:hidden`으로 깔끔한 preview. 섹션 설득력 급상승.
  - **명함 비교 CSS** (style.css:3222+): 왼쪽 종이 명함 `.problem__biz-card`가 실제 명함 레이아웃(로고, 이름, 직함, 구분선, 연락처 블러)으로 완성됨 — 비교 효과 강화.

- **여전히 미해결:**
  - Hero mobile mockup (index.html:86~97): `mockup-mobile__line` CSS skeleton 유지. Laptop에 iframe이 있으므로 상대적 영향은 낮으나, 일관성 면에서 완결되지 않음.
  - 세 demo profile 모두 CSS avatar(::before/::after로 구현한 실루엣) 사용 — 실제 얼굴 없음(정책상 올바름). 단, "실제 납품물" 레퍼런스(charlie-yeo.pro 등)와 비교하면 여전히 가상 인물.

---

### 2. Originality (8/10)

_이전 라운드: 7/10_

- **개선된 점 (+1점):**
  - 실제 HTML 파일로 제작된 3종 프로필이 iframe을 통해 직접 노출됨. "AI가 만든 그럴싸한 mock" 인상에서 "실제 작업물을 보여주는 포트폴리오" 인상으로 전환. "AI 슬롭 체크리스트"의 핵심 항목(실제 납품물 증거 부재) 해소.
  - 세 프로필의 디자인 언어가 명확히 구분됨: Dark/Gold(임원) vs Light/Green(창업가) vs White/Minimal(디렉터) — 직군별 커스터마이징 역량을 시각적으로 증명.

- **여전히 미해결:**
  - Hero 배경 mesh gradient + Pricing 3열 카드 구성 — SaaS 랜딩페이지 정석 패턴 유지. 구조 자체의 독창성 한계.
  - 세 demo profile 모두 `Cormorant Garamond` serif + `Noto Sans KR` sans-serif 동일 폰트 조합 — 스타일 차별화는 있으나 타이포그래피 다양성은 제한적.

- **"AI슬롭" 체크리스트 (업데이트):**
  - [x] Inter/Roboto/Arial 사용 — **없음** ✓
  - [x] 보라색 그라디언트 on 화이트 — **없음** ✓
  - [ ] 뻔한 카드 그리드 — **부분적 YES** (CrossSell 4-card; banner로 완화)
  - [ ] SaaS 템플릿 느낌 — **부분적 YES** (pricing tier 구조)
  - [x] 실제 납품물 증거 부재 — **해소** (iframe으로 실제 HTML 프로필 직접 노출) ✓

---

### 3. Craft (9/10)

_이전 라운드: 8/10_

- **개선된 점 (+1점):**
  - **WhyNow 통계 단위 수정** (index.html:196~208):
    - `data-count="1100" data-suffix="만+"` → 카운트업 후 "1,100만+" 표시 ✓
    - `data-count="194" data-suffix="만+"` → "194만+" 표시 ✓
    - `data-count="67" data-suffix="%"` → "67%" 표시 ✓
    - JS(main.js:169~188): suffix 감지 로직 정상 동작. 단, target >= 1000 조건에서 suffix와 무관하게 "만+"를 하드코드하므로 HTML data-suffix와 JS 로직이 완전히 동기화되지 않은 상태(기능적 출력은 올바름).
  - **Testimonials dots 4개** (index.html:572~577): data-dot="0"~"3" 완비. Round 2 지적 해소. 4번째 카드에도 dot이 활성화됨.
  - **iframe CSS 완결성** (style.css:3194~3220): `.mockup-iframe`, `.showcase__iframe`, `.problem__profile-iframe` 각각 `width:100%; height:100%; border:none; display:block` + 필요한 곳 `pointer-events:none` 적용. 섹션 주석 `/* Round 3 */`으로 추적 용이.

- **여전히 미해결:**
  - Pretendard CDN `font-display: swap` 불명확 — CDN @font-face 내부 정의 미확인 (Cormorant는 Google Fonts `display=swap` 명시, 불일치 유지).
  - JS 카운터 suffix 로직: `data-suffix="만+"`를 HTML에 추가했으나 JS에서 직접 사용하지 않고 조건 분기(>= 1000, else)로 처리 → 향후 값 변경 시 불일치 위험.

- **코드 품질 체크 (업데이트):**
  - [x] CSS 변수 활용 — **완전 활용** ✓
  - [x] 반응형 breakpoint — **767px / 1023px** ✓
  - [x] font-display: swap — **Cormorant ✓ / Pretendard △**
  - [x] `outline: none` 접근성 — **수정 완료** ✓
  - [x] 모바일 메뉴 전환 — **수정 완료** ✓
  - [x] WhyNow 통계 단위 — **수정 완료** ✓
  - [x] Testimonials dot 수 — **수정 완료** ✓

---

### 4. Functionality (9/10)

_이전 라운드: 9/10_

- **개선된 점 (유지 + 버그 해소):**
  - Testimonials dots 4개 완비 — 마지막 카드에서 4번째 dot 활성화 정상 예상.
  - iframe `loading="lazy"` 속성으로 FCP 영향 최소화.
  - Showcase tab 클릭 시 iframe 슬라이드 전환 — 기존 JS 로직이 `data-slide` 기반이므로 iframe 교체 후에도 정상 동작.

- **여전히 미해결:**
  - CTA 버튼 `href="#"` (index.html:643) — 카카오톡 링크 미연결. 광고 도착 URL 전환 시 필수 수정.
  - CrossSell 카드 `href="#"` — A형 페이지 미제작으로 인한 미완 (이해 가능).

- **기능 체크 (업데이트):**
  - [x] 9개 섹션 모두 존재 ✓
  - [x] 네비게이션 스크롤 하이라이트 ✓
  - [x] 모바일 햄버거 메뉴 (smooth transition) ✓
  - [x] Pricing 호버 효과 ✓
  - [x] Showcase iframe 슬라이드/탭 전환 ✓
  - [x] IntersectionObserver 애니메이션 ✓
  - [x] 별점 순차 애니메이션 ✓
  - [x] Testimonials dots 4개 ✓
  - [ ] CTA 버튼 실제 링크 연결 ✗

---

### 종합 피드백

**Round 3에서 해결된 사항:**
- ✓ Showcase: CSS illustration → 실제 HTML 프로필 iframe 3개 (핵심 설득 증거 완성)
- ✓ Hero laptop: CSS skeleton → demo-profile-01 iframe
- ✓ Problem section: CSS skeleton → 실제 프로필 iframe (비교 섹션 설득력 급상승)
- ✓ WhyNow: data-suffix 추가로 1,100만+ / 194만+ / 67% 올바르게 표시
- ✓ Testimonials: dot 4개로 수정 (기능 버그 해소)

**잘 유지된 부분 (계속 유지할 것):**
- Hero 3중 mesh gradient + JS mousemove parallax — 유지
- Process 교대 타임라인 (`nth-child odd/even`) — 유지
- Cormorant Garamond italic + Pretendard 폰트 전략 — 유지
- Reveal/stagger IntersectionObserver 시스템 — 유지
- 별점 bounce animation (`cubic-bezier(0.34, 1.56, 0.64, 1)`) — 유지
- CrossSell 15% 할인 bundle banner — 유지
- Testimonials 별점 순차 bounce animation — 유지

**남은 권고 사항 (우선순위 순):**

1. **CTA 버튼 카카오톡 링크 연결** (index.html:643)  
   광고 집행 전 필수. `href="#"` → 실제 카카오톡 채널/오픈채팅 URL.

2. **Hero mobile mockup iframe 또는 개선** (index.html:86~97)  
   CSS skeleton lines → demo-profile-01 iframe 또는 QR 명함 이미지로 교체 권고.

3. **JS 카운터 suffix 로직 통일** (main.js:182~188)  
   `data-suffix` attribute를 직접 읽어 `el.textContent = current.toLocaleString() + suffix`로 단순화 권고. 현재는 동작하나 유지보수 위험.

---

*이 리포트는 코드 정적 분석 기반. 실제 브라우저 렌더링, Lighthouse 점수, 모바일 스크롤 테스트는 별도 수행 필요.*

---

## 결론

**PASS (35/40, 목표 32점 달성)**

> Showcase + Hero + Problem 섹션에 실제 HTML 프로필 iframe이 삽입되어 설득력의 핵심 증거가 완성됨.  
> WhyNow 통계 단위 수정 및 Testimonials dot 버그 해소로 Craft·Functionality 향상.  
> 남은 과제는 CTA 실링크 연결(광고 집행 전 필수)과 mobile mockup 개선(선택).

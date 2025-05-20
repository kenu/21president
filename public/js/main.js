// 제21대 대통령선거 정보 웹사이트 자바스크립트

document.addEventListener('DOMContentLoaded', function() {
  // 페이지 로드 시 실행되는 코드
  console.log('선거 정보 웹사이트가 로드되었습니다.');
  
  // 폼 유효성 검사
  const form = document.querySelector('form');
  if (form) {
    form.addEventListener('submit', function(e) {
      const sgIdInput = document.getElementById('sgId');
      if (sgIdInput && sgIdInput.value.trim() === '') {
        e.preventDefault();
        alert('선거 ID를 입력해주세요.');
        sgIdInput.focus();
      }
    });
  }
  
  // 테이블 행에 호버 효과 추가
  const tableRows = document.querySelectorAll('.candidate-row');
  tableRows.forEach(row => {
    // 클릭 효과 강화
    row.addEventListener('mouseenter', function() {
      this.style.transform = 'translateY(-2px)';
    });
    
    row.addEventListener('mouseleave', function() {
      this.style.transform = 'translateY(0)';
    });
    
    // 클릭 이벤트
    row.addEventListener('click', function() {
      const candidateName = this.cells[0].textContent;
      const partyName = this.cells[1].textContent;
      console.log(`선택한 후보: ${candidateName} (${partyName})`);
      // 클릭 시 상세 페이지로 이동 - HTML에 onclick 속성이 있지만 이것은 추가 효과를 위한 코드
    });
  });
  
  // 상세 페이지에서 뒤로가기 버튼 효과
  const backButton = document.querySelector('a.btn-outline-primary');
  if (backButton) {
    backButton.addEventListener('mouseenter', function() {
      this.classList.add('btn-primary');
      this.classList.remove('btn-outline-primary');
    });
    
    backButton.addEventListener('mouseleave', function() {
      this.classList.add('btn-outline-primary');
      this.classList.remove('btn-primary');
    });
  }
});

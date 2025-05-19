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
  const tableRows = document.querySelectorAll('tbody tr');
  tableRows.forEach(row => {
    row.addEventListener('click', function() {
      // 클릭한 행의 후보자 정보를 콘솔에 출력 (나중에 상세 정보 표시 기능으로 확장 가능)
      const candidateName = this.cells[0].textContent;
      const partyName = this.cells[1].textContent;
      console.log(`선택한 후보: ${candidateName} (${partyName})`);
    });
  });
});

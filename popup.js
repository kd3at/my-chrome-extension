document.addEventListener('DOMContentLoaded', function() {
  const button = document.getElementById('copyButton');
  const output = document.getElementById('output');
  
  button.addEventListener('click', async function() {
    try {
      // 現在のタブの情報を取得
      const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
      
      // タイトルとURLを組み合わせてテキストを作成
      const text = `${tab.title}\n${tab.url}`;
      
      // クリップボードにコピー
      await navigator.clipboard.writeText(text);
      
      // 出力エリアに表示
      output.value = text;
      
      // ボタンのテキストを一時的に変更してフィードバックを提供
      const originalText = button.textContent;
      button.textContent = 'Copied!';
      setTimeout(() => {
        button.textContent = originalText;
      }, 2000);
      
    } catch (error) {
      console.error('Error:', error);
      output.value = 'Error: Could not copy title and URL';
    }
  });
}); 
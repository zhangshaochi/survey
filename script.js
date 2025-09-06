// 安全版本 - 仅移除敏感信息，保持原有逻辑
const API_URL = 'https://survey-nkoasqvzeg.cn-hangzhou-vpc.fcapp.run'; // 保留您的函数计算地址

async function getAnswer() {
    const questionInput = document.getElementById('questionInput');
    const answerArea = document.getElementById('answerArea');
    
    const question = questionInput.value.trim();
    if (!question) {
        alert('请输入问题');
        return;
    }

    questionInput.value = '';
    answerArea.innerHTML = '<p>思考中...</p>';

    try {
        // 关键修改：完全移除Authorization头，认证由函数计算后端处理
        const response = await fetch(API_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
                // 已删除敏感头
            },
            body: JSON.stringify({
                "model": "qwen-max",
                "input": {
                    "messages": [
                        {
                            "role": "user",
                            "content": question
                        }
                    ]
                }
            })
        });

        if (!response.ok) throw new Error(`请求失败: ${response.status}`);
        
        const data = await response.json();
        const answer = data.output.choices[0].message.content;
        answerArea.innerHTML = `<p>${answer}</p>`;
    } catch (error) {
        console.error('Error:', error);
        answerArea.innerHTML = `<p>出错: ${error.message}</p>`;
    }
}

// 保留原有回车键监听
document.getElementById('questionInput').addEventListener('keypress', function (e) {
    if (e.key === 'Enter') getAnswer();
});

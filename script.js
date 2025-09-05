// 重要：请替换为你从阿里百炼获取的实际API URL和API Key
const API_URL = 'https://dashscope.aliyuncs.com/compatible-mode/v1';
const API_KEY = 'sk-ce2b3770b8fe456db1a4993678e351f0';

async function getAnswer() {
    const questionInput = document.getElementById('questionInput');
    const answerArea = document.getElementById('answerArea');
    
    const question = questionInput.value.trim();
    if (!question) {
        alert('请输入问题');
        return;
    }

    // 清空输入框并显示加载中...
    questionInput.value = '';
    answerArea.innerHTML = '<p>思考中...</p>';

    try {
        // 使用fetch函数调用阿里百炼API
        const response = await fetch(API_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${API_KEY}` // 通常认证方式，请根据百炼实际要求修改
            },
            body: JSON.stringify({
                "model": "qwen-max", // 请根据你的智能体实际使用的模型修改
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

        if (!response.ok) {
            throw new Error(`网络请求错误: ${response.status}`);
        }

        const data = await response.json();
        
        // 从响应中提取回复内容
        // 注意：这里的路径 (data.output.choices[0].message.content) 是常见结构，请根据百炼API的实际返回JSON结构调整！
        const answer = data.output.choices[0].message.content;
        
        // 将回复显示在页面上
        answerArea.innerHTML = `<p>${answer}</p>`;
    } catch (error) {
        console.error('获取回复失败:', error);
        answerArea.innerHTML = `<p>出错啦: ${error.message}</p>`;
    }
}

// 可选：允许用户按回车键发送问题
document.getElementById('questionInput').addEventListener('keypress', function (e) {
    if (e.key === 'Enter') {
        getAnswer();
    }
});

from app.ai.llm import llm
from app.ai.schemas import SecurityResult
from app.ai.prompts.security import SECURITY_PROMPT


def security_agent(state):

    context = state["context"]

    repository = ""

    for file in context["source_files"]:

        repository += f"""

File Path:
{file.get("path")}

Language:
{file.get("language")}

Content:
{file.get("content", "")[:4000]}

========================================
"""

    prompt = f"""
{SECURITY_PROMPT}

Analyze the following repository.

{repository}
"""

    result = (
        llm.with_structured_output(SecurityResult)
        .invoke(prompt)
    )

    state["security"] = result
    
    return {
    "security": result
}
from app.ai.llm import llm
from app.ai.schemas import DocumentationResult
from app.ai.prompts.documentation import DOCUMENTATION_PROMPT


def documentation_agent(state):

    context = state["context"]

    prompt = f"""
{DOCUMENTATION_PROMPT}

Repository Summary:
{context['repository']}

Files:
{context['files']}

Classes:
{context['classes']}

Functions:
{context['functions']}
"""

    result = llm.with_structured_output(
        DocumentationResult
    ).invoke(prompt)

    state["documentation"]= result

    return {
    "documentation": result
}
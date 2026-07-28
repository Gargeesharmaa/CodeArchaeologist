from app.ai.llm import llm
from app.ai.schemas import ArchitectureResult
from app.ai.prompts.architecture import ARCHITECTURE_PROMPT


def architecture_agent(state):

    context = state["context"]

    prompt = f"""
{ARCHITECTURE_PROMPT}

Repository Summary:
{context["repository"]}

Files:
{context["files"]}

Classes:
{context["classes"]}

Functions:
{context["functions"]}

Imports:
{context["imports"]}
"""

    result = (
        llm.with_structured_output(ArchitectureResult)
        .invoke(prompt)
    )

    state["architecture"] = result

    return {
    "architecture": result
}
from app.ai.llm import llm
from app.ai.schemas import RefactorResult
from app.ai.prompts.refactor import REFACTOR_PROMPT


def refactor_agent(state):

    context = state["context"]

    prompt = f"""
{REFACTOR_PROMPT}

Repository Summary:
{context["repository"]}

Files:
{context["files"]}

Classes:
{context["classes"]}

Functions:
{context["functions"]}

Architecture Analysis:
{state["architecture"]}

Dependency Analysis:
{state["dependency"]}

Security Analysis:
{state["security"]}

Documentation Analysis:
{state["documentation"]}

Based on all analyses above, identify:

- Code smells
- SOLID violations
- Performance improvements
- Maintainability improvements
- Refactoring opportunities

Return structured JSON.
"""

    result = (
        llm.with_structured_output(
            RefactorResult
        ).invoke(prompt)
    )

    state["refacter"]=result
    
    return {
    "refactor": result
}
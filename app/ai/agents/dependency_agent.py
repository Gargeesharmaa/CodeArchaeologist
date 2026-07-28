from app.ai.llm import llm
from app.ai.schemas import DependencyResult
from app.ai.prompts.Dependency import DEPENDENCY_PROMPT


def dependency_agent(state):

    context = state["context"]

    prompt = f"""
{DEPENDENCY_PROMPT}

Repository Summary:
{context['repository']}

Files:
{context['files']}

Imports:
{context['imports']}

Dependency Graph:
{context['graph']}
"""

    result = llm.with_structured_output(
        DependencyResult
    ).invoke(prompt)

    state["dependency"] = result

    return {
    "dependency": result
}
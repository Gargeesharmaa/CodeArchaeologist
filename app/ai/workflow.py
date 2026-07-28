from langgraph.graph import StateGraph, END

from app.ai.state import CodeAnalysisState
from app.ai.context_builder import ContextBuilder
from app.ai.report_aggregator import ReportAggregator

from app.ai.agents.architecture_agent import architecture_agent
from app.ai.agents.dependency_agent import dependency_agent
from app.ai.agents.security_agent import security_agent
from app.ai.agents.documentation_agent import documentation_agent
from app.ai.agents.refactor_agent import refactor_agent


builder = StateGraph(CodeAnalysisState)

# Nodes
builder.add_node("architecture", architecture_agent)
builder.add_node("dependency", dependency_agent)
builder.add_node("security", security_agent)
builder.add_node("documentation", documentation_agent)
builder.add_node("refactor", refactor_agent)

# Entry
builder.set_entry_point("architecture")

# Fan-out
builder.add_edge("architecture", "dependency")
builder.add_edge("architecture", "security")
builder.add_edge("architecture", "documentation")

# Fan-in
builder.add_edge("dependency", "refactor")
builder.add_edge("security", "refactor")
builder.add_edge("documentation", "refactor")

builder.add_edge("refactor", END)

workflow = builder.compile()


def analyze(parsed_files, graph_data):

    context = ContextBuilder.build(parsed_files, graph_data)

    state = {
        "context": context
    }

    final_state = workflow.invoke(state)

    return ReportAggregator.aggregate(final_state)
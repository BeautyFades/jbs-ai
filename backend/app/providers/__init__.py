"""Provider-agnostic LLM backends for the agent loop.

Add a new backend by implementing the same surface as ClaudeProvider /
GeminiProvider / OpenAICompatibleProvider (see base.py) and wiring it in
below.
"""

from __future__ import annotations

from ..config import settings
from .claude import ClaudeProvider
from .gemini import GeminiProvider
from .openai_compatible import OpenAICompatibleProvider

PROVIDER_NAMES = ("claude", "gemini", "openai", "local")


def create_provider(name: str | None = None, model: str | None = None):
    """`name` selects the backend family; `model` overrides its configured
    default. Falls back to `settings.llm_provider` when `name` is omitted."""
    name = (name or settings.llm_provider).lower()

    if name == "claude":
        return ClaudeProvider(model=model or settings.anthropic_model)
    if name == "gemini":
        return GeminiProvider(
            model=model or settings.gemini_model,
            api_key=settings.gemini_api_key or None,
        )
    if name == "openai":
        return OpenAICompatibleProvider(
            model=model or settings.openai_model,
            base_url=settings.openai_base_url or None,
            api_key=settings.openai_api_key or None,
        )
    if name == "local":
        # Any OpenAI-compatible local server: Ollama, LM Studio, vLLM, ...
        return OpenAICompatibleProvider(
            model=model or settings.local_model,
            base_url=settings.local_base_url,
            api_key=settings.local_api_key,
        )
    raise ValueError(f"Unknown LLM provider '{name}'. Choose one of {PROVIDER_NAMES}.")

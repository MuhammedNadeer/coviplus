import gradio as gr
import google.generativeai as genai

genai.configure(api_key='AIzaSyB8pS_bC4LNB-t-27f-eRrsQb-mBWlBfQQ')

model = genai.GenerativeModel('gemini-pro')


with gr.Blocks() as demo:
    chatbot = gr.Chatbot()
    msg = gr.Textbox(label="Enter your message")
    print(msg)
    clear = gr.ClearButton([msg, chatbot])

    def respond(message, chat_history):
        response = model.generate_content(f"Give a small simple description for {message} without a title only a small description reply, only if this prompt is health related only othervise respond that it is beyond your capabilities")
        bot_message =response.text
        chat_history.append((message, bot_message))
        return "", chat_history
    # hi

    msg.submit(respond, [msg, chatbot], [msg, chatbot])

if __name__ == "__main__":
    demo.launch()
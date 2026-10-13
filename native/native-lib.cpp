#include <jni.h>
#include <string>
#include "rexcore.h"

static RexCore g_core;

extern "C"
JNIEXPORT jstring JNICALL
Java_com_rextoai_MainActivity_rexProcess(JNIEnv* env, jobject, jstring input) {
    const char* cstr = env->GetStringUTFChars(input, nullptr);
    std::string in(cstr);
    env->ReleaseStringUTFChars(input, cstr);
    return env->NewStringUTF(g_core.process(in).c_str());
}

extern "C"
JNIEXPORT jstring JNICALL
Java_com_rextoai_MainActivity_rexVersion(JNIEnv* env, jobject) {
    return env->NewStringUTF(g_core.getVersion().c_str());
}
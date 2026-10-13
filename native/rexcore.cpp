#include "rexcore.h"
#include <algorithm>
#include <sstream>

RexCore::RexCore() {}

std::string RexCore::toLower(const std::string& s) const {
    std::string r = s;
    std::transform(r.begin(), r.end(), r.begin(),
                   [](unsigned char c){ return std::tolower(c); });
    return r;
}

bool RexCore::contains(const std::string& h, const std::string& n) const {
    return h.find(n) != std::string::npos;
}

std::string RexCore::getVersion() const {
    return "GTI AI v1.0.0 (Neural Core)";
}

std::string RexCore::process(const std::string& input) {
    std::string t = toLower(input);
    if (contains(t, "halo") || contains(t, "hai")) return "Halo Tuan, GTI AI aktif.";
    if (contains(t, "nama")) return "Nama saya GTI AI.";
    if (contains(t, "versi")) return getVersion();
    std::ostringstream oss;
    oss << "Perintah diterima: \"" << input << "\".";
    return oss.str();
}
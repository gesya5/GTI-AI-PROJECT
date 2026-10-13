#ifndef REXCORE_H
#define REXCORE_H
#include <string>
class RexCore {
public:
    RexCore();
    std::string process(const std::string& input);
    std::string getVersion() const;
private:
    std::string toLower(const std::string& s) const;
    bool contains(const std::string& h, const std::string& n) const;
};
#endif

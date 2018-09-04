var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    }
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
// @ts-ignore
import * as React from 'react';
import gql from 'graphql-tag';
import { Mutation } from 'react-apollo';
export var createMessageMutation = gql(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n  mutation CreateMessageMutation($message: MessageInput!) {\n    createMessage(message: $message)\n  }\n"], ["\n  mutation CreateMessageMutation($message: MessageInput!) {\n    createMessage(message: $message)\n  }\n"])));
var CreateMessage = /** @class */ (function (_super) {
    __extends(CreateMessage, _super);
    function CreateMessage() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    CreateMessage.prototype.render = function () {
        var children = this.props.children;
        return (React.createElement(Mutation, { mutation: createMessageMutation }, function (mutate) {
            return children({
                createMessage: mutate
            });
        }));
    };
    return CreateMessage;
}(React.PureComponent));
export { CreateMessage };
var templateObject_1;
//# sourceMappingURL=index.js.map
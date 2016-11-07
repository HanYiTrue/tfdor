/**
 * Created by chepeiqing on 16/10/13.
 */
define(['app', 'service','sysCode'], function (app) {
    app.controller('modifyChannelCtrl', function (service, $scope, $location, $state, $stateParams, $rootScope) {
        $scope.channelInfo = service.getData();
        $scope.init = function () {
            $scope.channelId = $scope.channelInfo.channelId;
            $scope.channelName = $scope.channelInfo.channelName;
            $scope.appId = $scope.channelInfo.appId;
            $scope.wxToken = $scope.channelInfo.wxToken;
            $scope.appSecret = $scope.channelInfo.appSecret;
            $scope.state = $scope.channelInfo.state;
            //查询复合人
            service.post2SRV("queryAuditPerson.do",null,function(data, status){
                $scope.auditPerson = data;
            },4000);
        };

        $scope.doId = function () {
            if ($scope.channelName == null || $scope.channelName == '') {
                showError("错误提示", "请输入渠道名称");
                return;
            }
            if ($scope.appId == null || $scope.appId == '') {
                showError("错误提示", "请输入appId");
                return;
            }
            if ($scope.wxToken == null || $scope.wxToken == '') {
                showError("错误提示", "请输入微信Token");
                return;
            }
            if ($scope.appSecret == null || $scope.appSecret == '') {
                showError("错误提示", "请输入app密钥");
                return;
            }
            if ($scope.state == null) {
                $scope.state = 'N';
            }
            var formData = {
                "channelId": $scope.channelId,
                "channelName": $scope.channelName,
                "appId": $scope.appId,
                "wxToken": $scope.wxToken,
                "appSecret": $scope.appSecret,
                "state": $scope.state,
                "auditPersonSeq":$scope.person.userSeq,//复合人Seq
                "auditPerson":$scope.person.userName//复合人名称
            }
            service.post2SRV("modifyChannel.do", formData, function (data, status) {
                $state.go("Main.ChannelManager");
            }, 4000);
        }
        $scope.init();
    });
});
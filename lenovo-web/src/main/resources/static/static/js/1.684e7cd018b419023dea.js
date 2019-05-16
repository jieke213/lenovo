webpackJsonp([1], {
    "/LNZ": function (e, t, i) {
        "use strict";
        Object.defineProperty(t, "__esModule", {value: !0});
        var n = {
            mounted: function () {
                this.loadTableData()
            }, methods: {
                updatePosNameExec: function () {
                    var e = this;
                    if (this.isNotNullORBlank(this.updatePosName)) {
                        this.loading = !0;
                        var t = this;
                        this.putRequest("position" == this.state ? "/system/basic/position" : "/system/basic/joblevel", {
                            name: this.updatePosName,
                            id: this.updatePosId,
                            titleLevel: this.updateTitleLevel
                        }).then(function (i) {
                            if (t.loading = !1, i && 200 == i.status) {
                                e.dialogVisible = !1;
                                i.data;
                                _, t.loadTableData()
                            }
                        })
                    } else this.$message.warning("position" == this.state ? "职位名称不能为空!" : "职称名称不能为空!")
                }, deleteMany: function () {
                    var e = this, t = this;
                    this.$confirm("删除" + this.multipleSelection.length + "条数据, 是否继续?", "提示", {
                        confirmButtonText: "确定",
                        cancelButtonText: "取消",
                        type: "warning"
                    }).then(function () {
                        var e = "";
                        t.multipleSelection.forEach(function (t) {
                            e = e + t.id + ","
                        }), t.doDelete(e)
                    }).catch(function () {
                        e.$message({type: "info", message: "已取消删除"})
                    })
                }, addPosition: function () {
                    if (this.isNotNullORBlank(this.positionName)) if ("jobtitle" != this.state || this.isNotNullORBlank(this.titleLevel)) {
                        var e = this;
                        this.loading = !0, this.postRequest("position" == this.state ? "/system/basic/position" : "/system/basic/joblevel", {
                            name: this.positionName,
                            titleLevel: this.titleLevel
                        }).then(function (t) {
                            if (e.loading = !1, t && 200 == t.status) {
                                t.data;
                                _, e.loadTableData(), e.positionName = "", e.titleLevel = ""
                            }
                        })
                    } else this.$message.warning("请选择职称级别!"); else this.$message.warning("position" == this.state ? "职位名称不能为空!" : "职称名称不能为空!")
                }, handleSelectionChange: function (e) {
                    this.multipleSelection = e
                }, handleEdit: function (e, t) {
                    this.updatePosName = t.name, this.updatePosId = t.id, this.updateTitleLevel = t.titleLevel, this.dialogVisible = !0
                }, handleDelete: function (e, t) {
                    var i = this, n = this;
                    this.$confirm("删除[" + t.name + "], 是否继续?", "提示", {
                        confirmButtonText: "确定",
                        cancelButtonText: "取消",
                        type: "warning"
                    }).then(function () {
                        n.doDelete(t.id)
                    }).catch(function () {
                        i.$message({type: "info", message: "已取消删除"})
                    })
                }, doDelete: function (e) {
                    var t = this;
                    t.loading = !0;
                    var i = "position" == this.state ? "/system/basic/position/" : "/system/basic/joblevel/";
                    this.deleteRequest(i + e).then(function (e) {
                        t.loading = !1, e && 200 == e.status && t.loadTableData()
                    })
                }, loadTableData: function () {
                    var e = this;
                    this.loading = !0, this.getRequest("position" == this.state ? "/system/basic/positions" : "/system/basic/joblevels").then(function (t) {
                        e.loading = !1, t && 200 == t.status && (e.posData = t.data)
                    })
                }
            }, data: function () {
                return {
                    positionName: "",
                    updatePosName: "",
                    updateTitleLevel: "",
                    titleLevel: "",
                    updatePosId: -1,
                    loading: !1,
                    dialogVisible: !1,
                    multipleSelection: [],
                    type: [],
                    titleLevels: ["正高级", "副高级", "中级", "初级", "员级"],
                    nameLabelName: "position" == this.state ? "职位名称" : "职称名称",
                    posData: []
                }
            }, props: ["state"]
        }, a = {
            render: function () {
                var e = this, t = e.$createElement, i = e._self._c || t;
                return i("div", [i("div", {staticStyle: {"text-align": "left"}}, [i("el-input", {
                    staticStyle: {width: "300px"},
                    attrs: {
                        placeholder: "position" == e.state ? "添加职位..." : "添加职称...",
                        size: "mini",
                        "prefix-icon": "el-icon-plus"
                    },
                    nativeOn: {
                        keyup: function (t) {
                            if (!("button" in t) && e._k(t.keyCode, "enter", 13, t.key)) return null;
                            e.addPosition(t)
                        }
                    },
                    model: {
                        value: e.positionName, callback: function (t) {
                            e.positionName = t
                        }, expression: "positionName"
                    }
                }), e._v(" "), "jobtitle" == e.state ? i("el-select", {
                    attrs: {size: "mini", placeholder: "职称等级"},
                    model: {
                        value: e.titleLevel, callback: function (t) {
                            e.titleLevel = t
                        }, expression: "titleLevel"
                    }
                }, e._l(e.titleLevels, function (e) {
                    return i("el-option", {key: e, attrs: {label: e, value: e}})
                })) : e._e(), e._v(" "), i("el-button", {
                    attrs: {type: "primary", icon: "el-icon-plus", size: "mini"},
                    on: {click: e.addPosition}
                }, [e._v("添加")])], 1), e._v(" "), i("div", {staticStyle: {"margin-top": "10px"}}, [i("el-table", {
                    directives: [{
                        name: "loading",
                        rawName: "v-loading",
                        value: e.loading,
                        expression: "loading"
                    }],
                    staticStyle: {width: "80%"},
                    attrs: {data: e.posData, size: "mini", stripe: "", border: ""},
                    on: {"selection-change": e.handleSelectionChange}
                }, [i("el-table-column", {
                    attrs: {
                        type: "selection",
                        width: "55",
                        align: "left"
                    }
                }), e._v(" "), i("el-table-column", {
                    attrs: {
                        prop: "id",
                        label: "编号",
                        width: "80",
                        align: "left"
                    }
                }), e._v(" "), i("el-table-column", {
                    attrs: {
                        prop: "name",
                        label: "position" == e.state ? "职位名称" : "职称名称",
                        width: "180",
                        align: "left"
                    }
                }), e._v(" "), "jobtitle" == e.state ? i("el-table-column", {
                    attrs: {
                        prop: "titleLevel",
                        label: "职称级别",
                        width: "180",
                        align: "left"
                    }
                }) : e._e(), e._v(" "), i("el-table-column", {
                    attrs: {width: "180", label: "创建时间", align: "left"},
                    scopedSlots: e._u([{
                        key: "default", fn: function (t) {
                            return [e._v(e._s(e._f("formatDate")(t.row.createDate)))]
                        }
                    }])
                }), e._v(" "), i("el-table-column", {
                    attrs: {label: "操作", align: "left"},
                    scopedSlots: e._u([{
                        key: "default", fn: function (t) {
                            return [i("el-button", {
                                attrs: {size: "mini"}, on: {
                                    click: function (i) {
                                        e.handleEdit(t.$index, t.row)
                                    }
                                }
                            }, [e._v("编辑\n          ")]), e._v(" "), i("el-button", {
                                attrs: {size: "mini", type: "danger"},
                                on: {
                                    click: function (i) {
                                        e.handleDelete(t.$index, t.row)
                                    }
                                }
                            }, [e._v("删除\n          ")])]
                        }
                    }])
                })], 1)], 1), e._v(" "), i("div", {
                    staticStyle: {
                        "text-align": "left",
                        "margin-top": "10px"
                    }
                }, [e.posData.length > 0 ? i("el-button", {
                    attrs: {
                        type: "danger",
                        size: "mini",
                        disabled: 0 == e.multipleSelection.length
                    }, on: {click: e.deleteMany}
                }, [e._v("批量删除\n    ")]) : e._e()], 1), e._v(" "), i("div", {staticStyle: {"text-align": "left"}}, [i("el-dialog", {
                    attrs: {
                        title: "position" == e.state ? "编辑职位名称" : "编辑职称",
                        visible: e.dialogVisible,
                        width: "25%"
                    }, on: {
                        "update:visible": function (t) {
                            e.dialogVisible = t
                        }
                    }
                }, [i("el-input", {
                    attrs: {size: "mini", placeholder: "请输入新的职位名称..."},
                    model: {
                        value: e.updatePosName, callback: function (t) {
                            e.updatePosName = t
                        }, expression: "updatePosName"
                    }
                }), e._v(" "), "jobtitle" == e.state ? i("el-select", {
                    staticStyle: {"margin-top": "10px"},
                    attrs: {size: "mini", placeholder: "职称等级"},
                    model: {
                        value: e.updateTitleLevel, callback: function (t) {
                            e.updateTitleLevel = t
                        }, expression: "updateTitleLevel"
                    }
                }, e._l(e.titleLevels, function (e) {
                    return i("el-option", {key: e, attrs: {label: e, value: e}})
                })) : e._e(), e._v(" "), i("span", {
                    staticClass: "dialog-footer",
                    attrs: {slot: "footer"},
                    slot: "footer"
                }, [i("el-button", {
                    attrs: {size: "mini"}, on: {
                        click: function (t) {
                            e.dialogVisible = !1
                        }
                    }
                }, [e._v("取 消")]), e._v(" "), i("el-button", {
                    attrs: {type: "primary", size: "mini"},
                    on: {click: e.updatePosNameExec}
                }, [e._v("确 定")])], 1)], 1)], 1)])
            }, staticRenderFns: []
        }, l = i("VU/8")(n, a, !1, null, null, null);
        t.default = l.exports
    }, "5xQo": function (e, t, i) {
        "use strict";
        Object.defineProperty(t, "__esModule", {value: !0});
        var n = {
            render: function () {
                this.$createElement;
                this._self._c;
                return this._m(0)
            }, staticRenderFns: [function () {
                var e = this.$createElement, t = this._self._c || e;
                return t("div", [t("h1", [this._v("奖惩规则")])])
            }]
        }, a = i("VU/8")(null, n, !1, null, null, null);
        t.default = a.exports
    }, FvOz: function (e, t, i) {
        "use strict";
        Object.defineProperty(t, "__esModule", {value: !0});
        var n = i("bOdI"), a = i.n(n), l = {
            data: function () {
                return {
                    keywords: "",
                    depName: "",
                    treeLoading: !1,
                    dialogVisible: !1,
                    allDeps: [],
                    pDep: "",
                    treeData: [],
                    defaultProps: {label: "name", isLeaf: "leaf", children: "children"}
                }
            }, mounted: function () {
                this.treeLoading = !0, this.loadTreeData()
            }, watch: {
                keywords: function (e) {
                    this.$refs.tree.filter(e)
                }
            }, methods: {
                filterNode: function (e, t) {
                    return !e || -1 !== t.name.indexOf(e)
                }, loadTreeData: function () {
                    var e = this;
                    this.getRequest("/system/basic/dep/-1").then(function (t) {
                        e.treeLoading = !1, t && 200 == t.status && (e.treeData = t.data)
                    })
                }, setDataToTree: function (e, t, i) {
                    for (var n = 0; n < e.length; n++) {
                        var a = e[n];
                        if (a.id == t) return void(e[n].children = e[n].children.concat(i));
                        this.setDataToTree(a.children, t, i)
                    }
                }, addDep: function () {
                    var e = this;
                    this.dialogVisible = !1, this.treeLoading = !0, this.postRequest("/system/basic/dep", {
                        name: this.depName,
                        parentId: this.pDep
                    }).then(function (t) {
                        if (e.treeLoading = !1, t && 200 == t.status) {
                            var i = t.data;
                            e.depName = "", e.setDataToTree(e.treeData, e.pDep, i.msg)
                        }
                    })
                }, loadAllDeps: function () {
                    var e = this;
                    this.getRequest("/system/basic/deps").then(function (t) {
                        t && 200 == t.status && (e.allDeps = t.data)
                    })
                }, showAddDepView: function (e, t) {
                    this.loadAllDeps(), this.dialogVisible = !0, this.pDep = e.id, t.stopPropagation()
                }, deleteDep: function (e, t) {
                    var i = this;
                    e.children.length > 0 ? this.$message({
                        message: "该部门下尚有其他部门，不能被删除!",
                        type: "warning"
                    }) : this.$confirm("删除[" + e.name + "]部门, 是否继续?", "提示", {
                        confirmButtonText: "确定",
                        cancelButtonText: "取消",
                        type: "warning"
                    }).then(function () {
                        i.treeLoading = !0, i.deleteRequest("/system/basic/dep/" + e.id).then(function (t) {
                            if (i.treeLoading = !1, t && 200 == t.status) {
                                t.data;
                                i.deleteLocalDep(i.treeData, e)
                            }
                        })
                    }).catch(function () {
                        i.$message({type: "info", message: "已取消删除"})
                    }), t.stopPropagation()
                }, deleteLocalDep: function (e, t) {
                    for (var i = 0; i < e.length; i++) {
                        var n = e[i];
                        if (n.id == t.id) return void e.splice(i, 1);
                        this.deleteLocalDep(n.children, t)
                    }
                }, renderContent: function (e, t) {
                    var i, n, l = this, s = t.node, o = t.data;
                    t.store;
                    return e("span", {style: "flex: 1; display: flex; align-items: center; justify-content: space-between; font-size: 14px; padding-right: 8px;"}, [e("span", null, [e("span", null, [s.label])]), e("span", null, [e("el-button", (i = {
                        style: "font-size: 12px;",
                        attrs: {type: "primary", size: "mini"}
                    }, a()(i, "style", "padding:3px"), a()(i, "on", {
                        click: function () {
                            return l.showAddDepView(o, event)
                        }
                    }), i), ["添加部门"]), e("el-button", (n = {
                        style: "font-size: 12px;",
                        attrs: {type: "danger", size: "mini"}
                    }, a()(n, "style", "padding:3px"), a()(n, "on", {
                        click: function () {
                            return l.deleteDep(o, event)
                        }
                    }), n), ["删除部门"])])])
                }
            }
        }, s = {
            render: function () {
                var e = this, t = e.$createElement, i = e._self._c || t;
                return i("div", [i("div", {staticStyle: {"text-align": "left"}}, [i("el-input", {
                    staticStyle: {
                        width: "500px",
                        margin: "0px",
                        padding: "0px"
                    },
                    attrs: {placeholder: "输入部门名称搜索部门...", size: "mini", "prefix-icon": "el-icon-search"},
                    model: {
                        value: e.keywords, callback: function (t) {
                            e.keywords = t
                        }, expression: "keywords"
                    }
                })], 1), e._v(" "), i("div", [i("el-tree", {
                    directives: [{
                        name: "loading",
                        rawName: "v-loading",
                        value: e.treeLoading,
                        expression: "treeLoading"
                    }],
                    ref: "tree",
                    staticStyle: {width: "500px", "margin-top": "10px"},
                    attrs: {
                        props: e.defaultProps,
                        data: e.treeData,
                        "filter-node-method": e.filterNode,
                        "render-content": e.renderContent
                    }
                }), e._v(" "), i("div", {staticStyle: {"text-align": "left"}}, [i("el-dialog", {
                    attrs: {
                        title: "添加部门",
                        visible: e.dialogVisible,
                        width: "25%"
                    }, on: {
                        "update:visible": function (t) {
                            e.dialogVisible = t
                        }
                    }
                }, [i("div", [i("span", [e._v("上级部门")]), e._v(" "), i("el-select", {
                    staticStyle: {width: "200px"},
                    attrs: {placeholder: "请选择", size: "mini"},
                    model: {
                        value: e.pDep, callback: function (t) {
                            e.pDep = t
                        }, expression: "pDep"
                    }
                }, e._l(e.allDeps, function (e) {
                    return i("el-option", {key: e.id, attrs: {label: e.name, value: e.id}})
                }))], 1), e._v(" "), i("div", {staticStyle: {"margin-top": "10px"}}, [i("span", [e._v("部门名称")]), e._v(" "), i("el-input", {
                    staticStyle: {width: "200px"},
                    attrs: {size: "mini", placeholder: "请输入部门名称..."},
                    nativeOn: {
                        keyup: function (t) {
                            if (!("button" in t) && e._k(t.keyCode, "enter", 13, t.key)) return null;
                            e.addDep(t)
                        }
                    },
                    model: {
                        value: e.depName, callback: function (t) {
                            e.depName = t
                        }, expression: "depName"
                    }
                })], 1), e._v(" "), i("span", {
                    staticClass: "dialog-footer",
                    attrs: {slot: "footer"},
                    slot: "footer"
                }, [i("el-button", {
                    attrs: {size: "small"}, on: {
                        click: function (t) {
                            e.dialogVisible = !1
                        }
                    }
                }, [e._v("取消")]), e._v(" "), i("el-button", {
                    attrs: {size: "small", type: "primary"},
                    on: {click: e.addDep}
                }, [e._v("添加")])], 1)])], 1)], 1)])
            }, staticRenderFns: []
        }, o = i("VU/8")(l, s, !1, null, null, null);
        t.default = o.exports
    }, LJAE: function (e, t, i) {
        var n = {
            "./SysBasic.vue": "fc7a",
            "./SysCfg.vue": "ubks",
            "./SysData.vue": "UK/j",
            "./SysHr.vue": "ewEk",
            "./SysInit.vue": "agXO",
            "./SysLog.vue": "ZDkW",
            "./basic/DepMana.vue": "FvOz",
            "./basic/ECMana.vue": "5xQo",
            "./basic/JobTitleMana.vue": "c98W",
            "./basic/MenuRole.vue": "eLaH",
            "./basic/PosMana.vue": "/LNZ"
        };

        function a(e) {
            return i(l(e))
        }

        function l(e) {
            var t = n[e];
            if (!(t + 1)) throw new Error("Cannot find module '" + e + "'.");
            return t
        }

        a.keys = function () {
            return Object.keys(n)
        }, a.resolve = l, e.exports = a, a.id = "LJAE"
    }, TgRz: function (e, t, i) {
        "use strict";
        var n = {
            render: function () {
                this.$createElement;
                this._self._c;
                return this._m(0)
            }, staticRenderFns: [function () {
                var e = this.$createElement, t = this._self._c || e;
                return t("div", [t("h1", [this._v("职称管理")])])
            }]
        };
        t.a = n
    }, "UK/j": function (e, t, i) {
        "use strict";
        Object.defineProperty(t, "__esModule", {value: !0});
        var n = {
            render: function () {
                this.$createElement;
                this._self._c;
                return this._m(0)
            }, staticRenderFns: [function () {
                var e = this.$createElement, t = this._self._c || e;
                return t("div", [t("h1", [this._v("\n    备份恢复数据库\n  ")])])
            }]
        }, a = i("VU/8")(null, n, !1, null, null, null);
        t.default = a.exports
    }, XSWk: function (e, t) {
    }, ZDkW: function (e, t, i) {
        "use strict";
        Object.defineProperty(t, "__esModule", {value: !0});
        var n = {
            render: function () {
                this.$createElement;
                this._self._c;
                return this._m(0)
            }, staticRenderFns: [function () {
                var e = this.$createElement, t = this._self._c || e;
                return t("div", [t("h1", [this._v("\n    操作日志管理\n  ")])])
            }]
        }, a = i("VU/8")(null, n, !1, null, null, null);
        t.default = a.exports
    }, agXO: function (e, t, i) {
        "use strict";
        Object.defineProperty(t, "__esModule", {value: !0});
        var n = {
            render: function () {
                this.$createElement;
                this._self._c;
                return this._m(0)
            }, staticRenderFns: [function () {
                var e = this.$createElement, t = this._self._c || e;
                return t("div", [t("h1", [this._v("\n    初始化数据库\n  ")])])
            }]
        }, a = i("VU/8")(null, n, !1, null, null, null);
        t.default = a.exports
    }, bOdI: function (e, t, i) {
        "use strict";
        t.__esModule = !0;
        var n, a = i("C4MV"), l = (n = a, n && n.__esModule ? n : {default: n});
        t.default = function (e, t, i) {
            return t in e ? (0, l.default)(e, t, {
                value: i,
                enumerable: !0,
                configurable: !0,
                writable: !0
            }) : e[t] = i, e
        }
    }, c98W: function (e, t, i) {
        "use strict";
        Object.defineProperty(t, "__esModule", {value: !0});
        var n = i("XSWk"), a = i.n(n);
        for (var l in n) "default" !== l && (s = l, i.d(t, s, function () {
            return n[s]
        }));
        var s, o = i("TgRz"), r = i("VU/8")(a.a, o.a, !1, null, null, null);
        t.default = r.exports
    }, chGk: function (e, t) {
    }, eLaH: function (e, t, i) {
        "use strict";
        Object.defineProperty(t, "__esModule", {value: !0});
        var n = i("oAV5"), a = {
            mounted: function () {
                this.loading = !0, this.initRoles()
            }, methods: {
                deleteRole: function (e, t) {
                    var i = this;
                    this.$confirm("删除角色[" + t + "], 是否继续?", "提示", {
                        confirmButtonText: "确定",
                        cancelButtonText: "取消",
                        type: "warning"
                    }).then(function () {
                        i.loading = !0, i.deleteRequest("/system/basic/role/" + e).then(function (e) {
                            e && 200 == e.status ? i.initRoles() : i.loading = !1
                        })
                    }).catch(function () {
                        i.$message({type: "info", message: "已取消删除"})
                    })
                }, addNewRole: function () {
                    if (Object(n.b)(this.newRole, this.newRoleZh)) {
                        this.loading = !0;
                        var e = this;
                        this.postRequest("/system/basic/addRole", {
                            role: this.newRole,
                            roleZh: this.newRoleZh
                        }).then(function (t) {
                            if (t && 200 == t.status) {
                                t.data;
                                _, e.initRoles(), e.newRole = "", e.newRoleZh = ""
                            } else e.loading = !1
                        })
                    }
                }, updateRoleMenu: function (e) {
                    var t = this.$refs.tree[e].getCheckedKeys(!0), i = this;
                    this.putRequest("/system/basic/updateMenuRole", {
                        rid: this.activeColItem,
                        mids: t
                    }).then(function (e) {
                        e && 200 == e.status && (i.activeColItem = -1)
                    })
                }, collapseChange: function (e) {
                    if ("" != e) {
                        var t = this;
                        this.getRequest("/system/basic/menuTree/" + e).then(function (e) {
                            if (e && 200 == e.status) {
                                var i = e.data;
                                t.treeData = i.menus, t.checkedKeys = i.mids
                            }
                        })
                    }
                }, handleCheckChange: function (e, t, i) {
                }, initRoles: function () {
                    var e = this;
                    this.getRequest("/system/basic/roles").then(function (t) {
                        e.loading = !1, t && 200 == t.status && (e.roles = t.data, e.activeColItem = -1)
                    })
                }, cancelUpdateRoleMenu: function () {
                    this.activeColItem = -1
                }
            }, data: function () {
                return {
                    props: {label: "name", children: "children"},
                    newRole: "",
                    newRoleZh: "",
                    roles: [],
                    treeData: [],
                    checkedKeys: [],
                    loading: !1,
                    activeColItem: -1
                }
            }
        }, l = {
            render: function () {
                var e = this, t = e.$createElement, i = e._self._c || t;
                return i("div", [i("div", {
                    directives: [{
                        name: "loading",
                        rawName: "v-loading",
                        value: e.loading,
                        expression: "loading"
                    }], staticStyle: {"text-align": "left"}
                }, [i("el-input", {
                    staticStyle: {width: "250px"},
                    attrs: {placeholder: "请输入角色英文名称...", size: "mini"},
                    model: {
                        value: e.newRole, callback: function (t) {
                            e.newRole = t
                        }, expression: "newRole"
                    }
                }, [i("template", {slot: "prepend"}, [e._v("ROLE_")])], 2), e._v(" "), i("el-input", {
                    staticStyle: {width: "250px"},
                    attrs: {placeholder: "请输入角色中文名称...", size: "mini"},
                    model: {
                        value: e.newRoleZh, callback: function (t) {
                            e.newRoleZh = t
                        }, expression: "newRoleZh"
                    }
                }), e._v(" "), i("el-button", {
                    staticStyle: {"margin-left": "5px"},
                    attrs: {type: "primary", size: "mini"},
                    on: {click: e.addNewRole}
                }, [e._v("添加角色")])], 1), e._v(" "), i("div", {
                    staticStyle: {
                        "margin-top": "10px",
                        "text-align": "left"
                    }
                }, [i("el-collapse", {
                    staticStyle: {width: "500px"},
                    attrs: {accordion: ""},
                    on: {change: e.collapseChange},
                    model: {
                        value: e.activeColItem, callback: function (t) {
                            e.activeColItem = t
                        }, expression: "activeColItem"
                    }
                }, e._l(e.roles, function (t, n) {
                    return i("el-collapse-item", {
                        key: t.name,
                        attrs: {title: t.nameZh, name: t.id}
                    }, [i("el-card", {staticClass: "box-card"}, [i("div", {
                        attrs: {slot: "header"},
                        slot: "header"
                    }, [i("span", [e._v("可访问的资源")]), e._v(" "), i("el-button", {
                        staticStyle: {
                            color: "#f6061b",
                            margin: "0px",
                            float: "right",
                            padding: "3px 0",
                            width: "15px",
                            height: "15px"
                        }, attrs: {type: "text", icon: "el-icon-delete"}, on: {
                            click: function (i) {
                                e.deleteRole(t.id, t.nameZh)
                            }
                        }
                    })], 1), e._v(" "), i("div", [i("el-tree", {
                        key: t.id,
                        ref: "tree",
                        refInFor: !0,
                        attrs: {
                            props: e.props,
                            data: e.treeData,
                            "default-checked-keys": e.checkedKeys,
                            "node-key": "id",
                            "show-checkbox": "",
                            "highlight-current": ""
                        },
                        on: {"check-change": e.handleCheckChange}
                    })], 1), e._v(" "), i("div", {
                        staticStyle: {
                            display: "flex",
                            "justify-content": "flex-end",
                            "margin-right": "10px"
                        }
                    }, [i("el-button", {
                        attrs: {size: "mini"},
                        on: {click: e.cancelUpdateRoleMenu}
                    }, [e._v("取消修改")]), e._v(" "), i("el-button", {
                        attrs: {type: "primary", size: "mini"},
                        on: {
                            click: function (t) {
                                e.updateRoleMenu(n)
                            }
                        }
                    }, [e._v("确认修改")])], 1)])], 1)
                }))], 1)])
            }, staticRenderFns: []
        }, s = i("VU/8")(a, l, !1, null, null, null);
        t.default = s.exports
    }, ewEk: function (e, t, i) {
        "use strict";
        Object.defineProperty(t, "__esModule", {value: !0});
        var n = {
            data: function () {
                return {
                    keywords: "",
                    fullloading: !1,
                    hrs: [],
                    cardLoading: [],
                    eploading: [],
                    allRoles: [],
                    moreBtnState: !1,
                    selRoles: [],
                    selRolesBak: []
                }
            }, mounted: function () {
                this.initCards(), this.loadAllRoles()
            }, methods: {
                searchClick: function () {
                    this.initCards(), this.loadAllRoles()
                }, updateHrRoles: function (e, t) {
                    this.moreBtnState = !1;
                    var i = this;
                    if (this.selRolesBak.length == this.selRoles.length) {
                        for (var n = 0; n < this.selRoles.length; n++) for (var a = 0; a < this.selRolesBak.length; a++) if (this.selRoles[n] == this.selRolesBak[a]) {
                            this.selRolesBak.splice(a, 1);
                            break
                        }
                        if (0 == this.selRolesBak.length) return
                    }
                    this.eploading.splice(t, 1, !0), this.putRequest("/system/hr/roles", {
                        hrId: e,
                        rids: this.selRoles
                    }).then(function (n) {
                        if (i.eploading.splice(t, 1, !1), n && 200 == n.status) {
                            var a = n.data;
                            _, "success" == a.status && i.refreshHr(e, t)
                        }
                    })
                }, refreshHr: function (e, t) {
                    var i = this;
                    i.cardLoading.splice(t, 1, !0), this.putRequest("/system/hr/id/" + e).then(function (e) {
                        i.cardLoading.splice(t, 1, !1), i.hrs.splice(t, 1, e.data)
                    })
                }, loadSelRoles: function (e, t) {
                    var i = this;
                    this.moreBtnState = !0, this.selRoles = [], this.selRolesBak = [], e.forEach(function (e) {
                        i.selRoles.push(e.id), i.selRolesBak.push(e.id)
                    })
                }, loadAllRoles: function () {
                    var e = this;
                    this.getRequest("/system/basic/roles").then(function (t) {
                        e.fullloading = !1, t && 200 == t.status && (e.allRoles = t.data)
                    })
                }, switchChange: function (e, t, i) {
                    var n = this;
                    n.cardLoading.splice(i, 1, !0), this.putRequest("/system/hr/", {
                        enabled: e,
                        id: t
                    }).then(function (e) {
                        if (n.cardLoading.splice(i, 1, !1), e && 200 == e.status) {
                            var a = e.data;
                            _, "error" == a.status && n.refreshHr(t, i)
                        } else n.refreshHr(t, i)
                    })
                }, initCards: function () {
                    this.fullloading = !0;
                    var e, t = this;
                    e = "" === this.keywords ? "all" : this.keywords, this.getRequest("/system/hr/" + e).then(function (e) {
                        if (e && 200 == e.status) {
                            t.hrs = e.data;
                            var i = e.data.length;
                            t.cardLoading = Array.apply(null, Array(i)).map(function (e, t) {
                                return !1
                            }), t.eploading = Array.apply(null, Array(i)).map(function (e, t) {
                                return !1
                            })
                        }
                    })
                }, deleteHr: function (e) {
                    var t = this;
                    this.fullloading = !0, this.deleteRequest("/system/hr/" + e).then(function (e) {
                        if (t.fullloading = !1, e && 200 == e.status) {
                            var i = e.data;
                            _, "success" == i.status && (t.initCards(), t.loadAllRoles())
                        }
                    })
                }
            }
        }, a = {
            render: function () {
                var e = this, t = e.$createElement, i = e._self._c || t;
                return i("div", {
                    directives: [{
                        name: "loading",
                        rawName: "v-loading",
                        value: e.fullloading,
                        expression: "fullloading"
                    }], staticStyle: {"margin-top": "10px"}
                }, [i("div", {
                    staticStyle: {
                        "margin-bottom": "10px",
                        display: "flex",
                        "justify-content": "center",
                        "align-items": "center"
                    }
                }, [i("el-input", {
                    staticStyle: {width: "400px", "margin-right": "10px"},
                    attrs: {placeholder: "默认展示部分用户，可以通过用户名搜索更多用户...", "prefix-icon": "el-icon-search", size: "small"},
                    model: {
                        value: e.keywords, callback: function (t) {
                            e.keywords = t
                        }, expression: "keywords"
                    }
                }), e._v(" "), i("el-button", {
                    attrs: {size: "small", type: "primary", icon: "el-icon-search"},
                    on: {click: e.searchClick}
                }, [e._v("搜索")])], 1), e._v(" "), i("div", {
                    staticStyle: {
                        display: "flex",
                        "justify-content": "space-around",
                        "flex-wrap": "wrap",
                        "text-align": "left"
                    }
                }, e._l(e.hrs, function (t, n) {
                    return i("el-card", {
                        directives: [{
                            name: "loading",
                            rawName: "v-loading",
                            value: e.cardLoading[n],
                            expression: "cardLoading[index]"
                        }], key: t.id, staticStyle: {width: "350px", "margin-bottom": "20px"}
                    }, [i("div", {
                        staticClass: "clearfix",
                        attrs: {slot: "header"},
                        slot: "header"
                    }, [i("span", [e._v(e._s(t.name))]), e._v(" "), i("el-button", {
                        staticStyle: {
                            color: "#f6061b",
                            margin: "0px",
                            float: "right",
                            padding: "3px 0",
                            width: "15px",
                            height: "15px"
                        }, attrs: {type: "text", icon: "el-icon-delete"}, on: {
                            click: function (i) {
                                e.deleteHr(t.id)
                            }
                        }
                    })], 1), e._v(" "), i("div", [i("div", {
                        staticStyle: {
                            width: "100%",
                            display: "flex",
                            "justify-content": "center"
                        }
                    }, [i("img", {
                        staticStyle: {width: "70px", height: "70px", "border-radius": "70px"},
                        attrs: {src: t.userface, alt: "item.name"}
                    })]), e._v(" "), i("div", {staticStyle: {"margin-top": "20px"}}, [i("div", [i("span", {staticClass: "user-info"}, [e._v("用户名:" + e._s(t.name))])]), e._v(" "), i("div", [i("span", {staticClass: "user-info"}, [e._v("手机号码:" + e._s(t.phone))])]), e._v(" "), i("div", [i("span", {staticClass: "user-info"}, [e._v("电话号码:" + e._s(t.telephone))])]), e._v(" "), i("div", [i("span", {staticClass: "user-info"}, [e._v("地址:" + e._s(t.address))])]), e._v(" "), i("div", {
                        staticClass: "user-info",
                        staticStyle: {display: "flex", "align-items": "center", "margin-bottom": "3px"}
                    }, [e._v("\n              用户状态:\n              "), i("el-switch", {
                        key: t.id,
                        staticStyle: {display: "inline", "margin-left": "5px"},
                        attrs: {
                            "active-color": "#13ce66",
                            "inactive-color": "#aaaaaa",
                            "active-text": "启用",
                            "inactive-text": "禁用"
                        },
                        on: {
                            change: function (i) {
                                e.switchChange(t.enabled, t.id, n)
                            }
                        },
                        model: {
                            value: t.enabled, callback: function (i) {
                                e.$set(t, "enabled", i)
                            }, expression: "item.enabled"
                        }
                    })], 1), e._v(" "), i("div", {staticClass: "user-info"}, [e._v("\n              用户角色:\n              "), e._l(t.roles, function (t) {
                        return i("el-tag", {
                            key: t.id,
                            staticStyle: {"margin-right": "5px"},
                            attrs: {type: "success", size: "mini", "disable-transitions": !1}
                        }, [e._v(e._s(t.nameZh) + "\n              ")])
                    }), e._v(" "), i("el-popover", {
                        directives: [{
                            name: "loading",
                            rawName: "v-loading",
                            value: e.eploading[n],
                            expression: "eploading[index]"
                        }],
                        key: t.id,
                        attrs: {placement: "right", title: "角色列表", width: "200", trigger: "click"},
                        on: {
                            hide: function (i) {
                                e.updateHrRoles(t.id, n)
                            }
                        }
                    }, [i("el-select", {
                        attrs: {multiple: "", placeholder: "请选择角色"},
                        model: {
                            value: e.selRoles, callback: function (t) {
                                e.selRoles = t
                            }, expression: "selRoles"
                        }
                    }, e._l(e.allRoles, function (e) {
                        return i("el-option", {key: e.id, attrs: {label: e.nameZh, value: e.id}})
                    })), e._v(" "), i("el-button", {
                        staticStyle: {color: "#09c0f6", "padding-top": "0px"},
                        attrs: {slot: "reference", type: "text", icon: "el-icon-more", disabled: e.moreBtnState},
                        on: {
                            click: function (i) {
                                e.loadSelRoles(t.roles, n)
                            }
                        },
                        slot: "reference"
                    })], 1)], 2), e._v(" "), i("div", [i("span", {staticClass: "user-info"}, [e._v("备注:" + e._s(t.remark))])])])])])
                }))])
            }, staticRenderFns: []
        };
        var l = i("VU/8")(n, a, !1, function (e) {
            i("chGk")
        }, null, null);
        t.default = l.exports
    }, fc7a: function (e, t, i) {
        "use strict";
        Object.defineProperty(t, "__esModule", {value: !0});
        var n = i("eLaH"), a = i("FvOz"), l = i("5xQo"), s = i("c98W"), o = i("/LNZ"), r = {
            data: function () {
                return {defaultTab: "depMana"}
            },
            methods: {},
            components: {
                "menu-role": n.default,
                "dep-mana": a.default,
                "ec-mana": l.default,
                "jobtitle-mana": s.default,
                "pos-mana": o.default
            }
        }, c = {
            render: function () {
                var e = this, t = e.$createElement, i = e._self._c || t;
                return i("div", {staticStyle: {"margin-top": "10px"}}, [i("el-tabs", {
                    attrs: {type: "card"},
                    model: {
                        value: e.defaultTab, callback: function (t) {
                            e.defaultTab = t
                        }, expression: "defaultTab"
                    }
                }, [i("el-tab-pane", {
                    attrs: {
                        label: "部门管理",
                        name: "depMana"
                    }
                }, [i("dep-mana")], 1), e._v(" "), i("el-tab-pane", {
                    attrs: {
                        label: "职位管理",
                        name: "positionMana"
                    }
                }, [i("pos-mana", {attrs: {state: "position"}})], 1), e._v(" "), i("el-tab-pane", {
                    attrs: {
                        label: "职称管理",
                        name: "jobTitleMana"
                    }
                }, [i("pos-mana", {attrs: {state: "jobtitle"}})], 1), e._v(" "), i("el-tab-pane", {
                    attrs: {
                        label: "奖惩规则",
                        name: "ecCfg"
                    }
                }, [i("ec-mana")], 1), e._v(" "), i("el-tab-pane", {
                    attrs: {
                        label: "权限组",
                        name: "menuRole"
                    }
                }, [i("menu-role")], 1)], 1)], 1)
            }, staticRenderFns: []
        }, d = i("VU/8")(r, c, !1, null, null, null);
        t.default = d.exports
    }, ubks: function (e, t, i) {
        "use strict";
        Object.defineProperty(t, "__esModule", {value: !0});
        var n = {
            render: function () {
                this.$createElement;
                this._self._c;
                return this._m(0)
            }, staticRenderFns: [function () {
                var e = this.$createElement, t = this._self._c || e;
                return t("div", [t("h1", [this._v("\n    系统管理\n  ")])])
            }]
        }, a = i("VU/8")(null, n, !1, null, null, null);
        t.default = a.exports
    }
});
//# sourceMappingURL=1.684e7cd018b419023dea.js.map